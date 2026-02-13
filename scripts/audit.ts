/**
 * Audit: Perform checks (jsdoc, props, doclink) using Typescript AST parser
 * and automatically add missing JSDoc documentation to icon components.
 * @module Audit
 */

import fs from 'node:fs'
import path from 'node:path'

import chalk from 'chalk'
import ts, { type ExportKeyword } from 'typescript'

import pkg from '../package.json'
import { ICONS_DIR, REGEX } from '.'

interface AuditResults {
  hasJSDocBlock: boolean
  isSeeLinkValid: boolean
  arePropsDocumented: boolean
  changesMade: boolean
}

/**
 * Checks if URL matches the expected pattern
 * @param {string} url - The URL to check
 * @param {string} expectedPattern - The expected URL pattern
 * @returns {boolean} True if URL matches pattern
 */
const isValidDocLink = (url: string, expectedPattern: string): boolean => {
  try {
    const parsedUrl = new URL(url)
    const parsedPattern = new URL(expectedPattern)

    return (
      parsedUrl.protocol === parsedPattern.protocol &&
      parsedUrl.hostname === parsedPattern.hostname &&
      parsedUrl.pathname.startsWith(parsedPattern.pathname)
    )
  } catch {
    return false
  }
}

/**
 * Generates JSDoc with validated doc link
 * @param {string} componentName - Name of the component
 * @param {string[]} propNames - Names of the props
 * @param {string} docLink - Documentation link
 * @param {string} expectedPattern - Expected URL pattern
 * @returns {string} Generated JSDoc string
 */
const generateJSDoc = (
  componentName: string,
  propNames: string[],
  docLink: string,
  expectedPattern: string
): string => {
  const validLink = isValidDocLink(docLink, expectedPattern)
    ? docLink
    : 'https://example.com/icons'

  const propLines = propNames
    .filter((p) => p !== 'rest')
    .map((propName) => {
      return ` * @param {any} [${propName}] - ${propName} description`
    })

  if (propLines.length > 0) {
    return `/**
 * ${componentName} icon
${propLines.join('\n')}
 * @see ${validLink}
 */`
  }

  return `/**
 * ${componentName} icon
 * @see ${validLink}
 */`
}

/**
 * Gets the component name from the source file
 * @param {ts.SourceFile} sourceFile - The TypeScript source file
 * @returns {string | null} Component name or null if not found
 */
const getComponentName = (sourceFile: ts.SourceFile): string | null => {
  let componentName: string | null = null

  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node)) {
      componentName = node.name.getText()
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return componentName
}

/**
 * Audits an icon file and adds missing JSDoc documentation
 * @param {string} filePath - Path to the icon file
 * @param {boolean} shouldFix - Whether to apply fixes to the file
 * @returns {AuditResults} Audit results and modified code if changes were made
 */

const auditAndFixIconFile = (filePath: string, shouldFix: boolean): AuditResults => {
  const code = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(
    filePath,
    code,
    ts.ScriptTarget.Latest,
    true
  )

  let hasJSDocBlock = false
  let isSeeLinkValid = false
  let arePropsDocumented = true
  let modifiedCode = code
  let changesMade = false

  const componentName = getComponentName(sourceFile)

  const expectedPattern = `${pkg.repository.url}/blob/release/src/icons/`
  const docLink = `${expectedPattern}${path.basename(filePath)}`

  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableStatement(node) &&
      Array.isArray(node.modifiers) &&
      node.modifiers.some(
        (m): m is ExportKeyword => m.kind === ts.SyntaxKind.ExportKeyword
      )
    ) {
      for (const declaration of node.declarationList.declarations) {
        if (
          declaration.initializer != null &&
          (ts.isArrowFunction(declaration.initializer) ||
            ts.isFunctionExpression(declaration.initializer)) &&
          (declaration.initializer.body.getText().includes('<') ||
            declaration.initializer.body
              .getText()
              .includes('React.createElement'))
        ) {
          const docs = ts.getJSDocCommentsAndTags(node)
          const propNames: string[] = []

          // Extract prop names from destructuring in parameters
          if (declaration.initializer.parameters.length > 0) {
            const param = declaration.initializer.parameters[0]
            if (param && ts.isParameter(param) && param.name && ts.isObjectBindingPattern(param.name)) {
                for (const element of param.name.elements) {
                    propNames.push(element.name.getText())
                }
            }
          }


          if (docs?.length > 0) {
            hasJSDocBlock = true;
            const jsdocText = docs.map((j) => j.getText()).join('\n')
            let hasValidSeeTag = false
            if (REGEX.JSDOC.REF.test(jsdocText)) {
              const match = jsdocText.match(REGEX.JSDOC.REF)
              if (
                match != null &&
                isValidDocLink(match[1] as string, expectedPattern)
              ) {
                hasValidSeeTag = true
              }
            }

            if(hasValidSeeTag) {
                isSeeLinkValid = true
            } else {
                const lastDoc = docs[docs.length - 1]
                const end = lastDoc.getEnd()
                const insertionPoint = end - 2 // before */
                const seeTag = ` * @see ${docLink}\n `
                modifiedCode = modifiedCode.slice(0, insertionPoint) + seeTag + modifiedCode.slice(insertionPoint)
                isSeeLinkValid = true
                changesMade = true
            }

            // Check for undocumented props
            const paramTags = docs.flatMap(d => d.tags ?? []).filter(t => t.tagName.escapedText === 'param')
            const documentedParams = paramTags.map(t => (t as ts.JSDocParameterTag).name.getText())
            const undocumentedProps = propNames.filter(p => p !== 'rest' && !documentedParams.some(dp => dp.endsWith(p)))

            if(undocumentedProps.length > 0) {
              arePropsDocumented = false // Set to false because not all are documented
              changesMade = true // Mark that changes were made

              const jsdocNode = docs[0]; // Assuming docs[0] is the main JSDoc block

              // Extract existing comment lines
              const existingCommentText = jsdocNode.comment ?? '';
              const existingCommentLines = existingCommentText ? existingCommentText.split('\n') : [];
              const existingParamTags = docs.flatMap(d => d.tags ?? []).filter(t => t.tagName.escapedText === 'param');
              const existingSeeTag = docs.flatMap(d => d.tags ?? []).find(t => t.tagName.escapedText === 'see');

              // Generate new param tags for undocumented props
              const newParamTagLines = undocumentedProps.map(propName => {
                const funcParams = (declaration.initializer as ts.ArrowFunction | ts.FunctionExpression).parameters;
                const paramBinding = funcParams.length > 0 && funcParams[0].name && ts.isObjectBindingPattern(funcParams[0].name)
                    ? funcParams[0].name
                    : undefined;

                let inferredType = 'any';
                if (paramBinding) {
                    const element = paramBinding.elements.find(el => el.name.getText() === propName);
                    if (element) {
                        if (element.type) { // If type is explicitly defined like { prop: string }
                            inferredType = element.type.getText();
                        } else if (element.initializer) { // If there's a default value
                            if (ts.isStringLiteral(element.initializer)) {
                                inferredType = 'string';
                            } else if (ts.isNumericLiteral(element.initializer)) {
                                inferredType = 'number';
                            } else if (element.initializer.kind === ts.SyntaxKind.TrueKeyword || element.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                                inferredType = 'boolean';
                            }
                            // Add more literal types as needed
                        }
                    }
                }
                return ` * @param {${inferredType}} [${propName}] - ${propName} description`;
              });

              // Reconstruct the JSDoc block
              const newJSDocLines: string[] = ['/**'];

              // Add existing main comment lines
              existingCommentLines.forEach(line => newJSDocLines.push(` * ${line}`));

              // Add a blank line if there's existing comment content and other tags/params will follow
              if (existingCommentLines.length > 0 && (existingParamTags.length > 0 || newParamTagLines.length > 0 || existingSeeTag)) {
                newJSDocLines.push(' *');
              }

              // Add all param tags (existing and new)
              existingParamTags.forEach(tag => newJSDocLines.push(` * ${tag.getText(sourceFile)}`));
              newParamTagLines.forEach(line => newJSDocLines.push(line));

              // Add @see tag if it exists
              if (existingSeeTag) {
                // Add a blank line before @see if there are param tags above it
                if ((existingParamTags.length > 0 || newParamTagLines.length > 0) && existingSeeTag) {
                  newJSDocLines.push(' *');
                }
                newJSDocLines.push(` * ${existingSeeTag.getText(sourceFile)}`);
              }

              newJSDocLines.push(' */');
              const newJSDocContent = newJSDocLines.join('\n');

              // Replace the old JSDoc block in modifiedCode with the new JSDoc block
              modifiedCode = modifiedCode.substring(0, jsdocNode.pos) + newJSDocContent + modifiedCode.substring(jsdocNode.end);
            }

          } else if (componentName != null) {
            const jsDoc = generateJSDoc(
              componentName,
              propNames,
              docLink,
              expectedPattern
            )
            const startPos = node.getStart(sourceFile)
            const prevChar = modifiedCode.slice(
              Math.max(0, startPos - 1),
              startPos
            )
            const needsNewline = !['\n', '\r', undefined].includes(prevChar)

            modifiedCode =
              modifiedCode.slice(0, startPos) +
              (needsNewline ? '\n' : '') +
              jsDoc +
              '\n' +
              modifiedCode.slice(startPos)

            changesMade = true
            hasJSDocBlock = true
            isSeeLinkValid = true
            arePropsDocumented = true
          }
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (changesMade && shouldFix) {
    fs.writeFileSync(filePath, modifiedCode.replace(/\r\n/g, '\n'), 'utf8') // based on LF EOL sequence
  }

  return { hasJSDocBlock, isSeeLinkValid, arePropsDocumented, changesMade }
}

const shouldFix = process.argv.includes('--fix');

for (const icon of fs.readdirSync(ICONS_DIR)) {
  const result = auditAndFixIconFile(path.join(ICONS_DIR, icon), shouldFix)

  const jsDocBlock = result.hasJSDocBlock ? chalk.green('✓ JSDocBlock') : chalk.redBright('✗ JSDocBlock');
  const seeLinkValid = result.isSeeLinkValid ? chalk.green('✓ SeeLinkValid') : chalk.redBright('✗ SeeLinkValid');
  const propsDocumented = result.arePropsDocumented ? chalk.green('✓ PropsDocumented') : chalk.redBright('✗ PropsDocumented');

  const status =
    (result.hasJSDocBlock && result.isSeeLinkValid && result.arePropsDocumented)
      ? chalk.bgGreenBright.black('  CORRECT  ')
      : result.changesMade
        ? (shouldFix
            ? chalk.bgGreen.black('   FIXED   ')
            : chalk.bgYellow.black('  FIXABLE  '))
        : chalk.bgRedBright.black(' INCORRECT ');

  console.log(`${chalk.cyan(icon.padEnd(24))} ${status} ${jsDocBlock} ${seeLinkValid} ${propsDocumented}`)
}
