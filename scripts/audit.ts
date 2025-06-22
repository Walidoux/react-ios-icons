/**
 * Audit: Perform checks (jsdoc, props, doclink) using Typescript AST parser
 * and automatically add missing JSDoc documentation to icon components.
 * @module Audit
 */

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

import chalk from 'chalk'
import ts from 'typescript'

import { ICONS_DIR } from './index.js'

interface AuditResults {
  hasJSDoc: boolean
  hasProps: boolean
  hasDocLink: boolean
  changesMade: boolean
}

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

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
 * Extracts props information from a TypeScript source file
 * @param {ts.SourceFile} sourceFile - The TypeScript source file
 * @returns {Object} Props information including interface name and properties
 */
const extractPropsInfo = (
  sourceFile: ts.SourceFile
): { interfaceName: string; props: ts.PropertySignature[] } | null => {
  let propsInterface!: ts.InterfaceDeclaration | null

  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
      propsInterface = node
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (propsInterface == null) return null

  return {
    interfaceName: propsInterface.name.text,
    props: propsInterface.members.filter((element): element is ts.PropertySignature => ts.isPropertySignature(element))
  }
}

/**
 * Generates JSDoc with validated doc link
 * @param {string} componentName - Name of the component
 * @param {Object | null} propsInfo - Props information
 * @param {string} docLink - Documentation link
 * @param {string} expectedPattern - Expected URL pattern
 * @returns {string} Generated JSDoc string
 */
const generateJSDoc = (
  componentName: string,
  propsInfo: { interfaceName: string; props: ts.PropertySignature[] } | null,
  docLink: string,
  expectedPattern: string
): string => {
  const validLink = isValidDocLink(docLink, expectedPattern) ? docLink : 'https://example.com/icons'

  if (propsInfo != null) {
    const propLines = propsInfo.props.map((prop): string => {
      const propName = prop.name.getText()
      const isOptional = prop.questionToken !== undefined
      const typeText = prop.type?.getText() ?? 'any'
      const defaultValue =
        prop.type != null && ts.isUnionTypeNode(prop.type)
          ? prop.type.types
              .find((t) => t.getText().includes('='))
              ?.getText()
              .split('=')[1]
              ?.trim()
          : undefined

      const defaultValueText = defaultValue != null ? `=${defaultValue}` : ''
      const optionalBrackets = isOptional ? '[' : ''
      const optionalBracketsClose = isOptional ? ']' : ''

      return ` * @param {${typeText}} ${optionalBrackets}props.${propName}${defaultValueText}${optionalBracketsClose} - ${propName} description`
    })

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
 * @returns {AuditResults} Audit results and modified code if changes were made
 */

const auditAndFixIconFile = (filePath: string): AuditResults => {
  const code = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true)

  let hasJSDoc = false
  let hasProps = false
  let hasDocLink = false
  let modifiedCode = code
  let changesMade = false

  const propsInfo = extractPropsInfo(sourceFile)
  const componentName = getComponentName(sourceFile)

  const expectedPattern = `${pkg.repository.url}/blob/release/src/icons/`
  const docLink = `${expectedPattern}${path.basename(filePath)}`

  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) || ts.isVariableStatement(node)) {
      const jsDocs = ts.getJSDocCommentsAndTags(node)
      if (jsDocs?.length > 0) {
        hasJSDoc = true
        const jsdocText = jsDocs.map((j) => j.getText()).join('\n')
        if (/@see\s+https?:\/\//.test(jsdocText)) {
          const match = jsdocText.match(/@see\s+(https?:\/\/\S+)/)
          if (match != null && isValidDocLink(match[1] as string, expectedPattern)) {
            hasDocLink = true
          }
        }
      } else if (componentName != null) {
        const jsDoc = generateJSDoc(componentName, propsInfo, docLink, expectedPattern)
        const startPos = node.getStart(sourceFile)
        const prevChar = modifiedCode.slice(Math.max(0, startPos - 1), startPos)
        const needsNewline = !['\n', '\r', undefined].includes(prevChar)

        modifiedCode =
          modifiedCode.slice(0, startPos) + (needsNewline ? '\n' : '') + jsDoc + '\n' + modifiedCode.slice(startPos)

        changesMade = true
        hasJSDoc = true
        hasDocLink = true
      }
    }

    if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
      hasProps = true
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  if (changesMade) {
    fs.writeFileSync(filePath, modifiedCode, 'utf8')
  }

  return { hasJSDoc, hasProps, hasDocLink, changesMade }
}

for (const icon of fs.readdirSync(ICONS_DIR)) {
  const iconPath = path.join(ICONS_DIR, icon)
  const result = auditAndFixIconFile(iconPath)

  const status = result.changesMade ? chalk.bgGreen.black(' FIXED ') : chalk.bgGreenBright.black(' OK ')

  const jsdoc = result.hasJSDoc ? chalk.green('JSDoc✓') : chalk.gray('JSDoc✗')
  const props = result.hasProps ? chalk.green('Props✓') : chalk.gray('Props✗')
  const doclink = result.hasDocLink ? chalk.green('DocLink✓') : chalk.gray('DocLink✗')

  console.log(`${chalk.cyan(icon.padEnd(24))} ${status} ${jsdoc} ${props} ${doclink}`)
}
