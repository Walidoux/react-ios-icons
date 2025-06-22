/** Audit : Perform checks (jsdoc, props, doclink) using Typescript AST parser */

import fs from 'node:fs'
import path from 'node:path'

import ts from 'typescript'

import { ICONS_DIR } from './index.js'

const auditIconFile = (filePath: string) => {
  const code = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true)

  let hasJSDoc = false
  let hasProps = false
  let hasDocLink = false

  const visit = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) || ts.isVariableStatement(node) || ts.isClassDeclaration(node)) {
      const jsDocs = ts.getJSDocCommentsAndTags(node)
      if (jsDocs != null && jsDocs.length > 0) {
        hasJSDoc = true
        const jsdocText = jsDocs.map((j) => j.getText()).join('\n')
        if (/@see\s+https?:\/\//.test(jsdocText)) {
          hasDocLink = true
        }
      }
    }

    if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
      hasProps = true
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return { hasJSDoc, hasProps, hasDocLink }
}

// Example usage for all icons:
for (const icon of fs.readdirSync(ICONS_DIR)) {
  if (!icon.endsWith('.tsx')) continue
  const iconPath = path.join(ICONS_DIR, icon)
  const result = auditIconFile(iconPath)
  console.log(`${icon}:`, result)
}
