/** Audit : Performs checks on icons (docs, matching props) */

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

import { ICONS_DIR } from './index.js'
import pkg from '../package.json' assert { type: 'json' }

const DEFAULT_JSDOC = (icon: string): string => `/**
 * ${icon} icon
 * @see ${pkg.repository.url}/blob/release/src/icons/${icon}
 */
`

const DEFAULT_PROPS = `interface IconProps {
  // Add your props here
}
`

const cycleThroughIcons = (): void => {
  for (const icon of fs.readdirSync(ICONS_DIR)) {
    const iconPath = path.join(ICONS_DIR, icon)
    let content = fs.readFileSync(iconPath, 'utf8')

    const hasJSDoc = /\/\*\*([\S\s]*?)\*\//.test(content)
    const hasExport = /export const /i.test(content)
    const hasProps = /interface \w+Props/.test(content)
    const hasDocLink = /@see https?:\/\//.test(content)

    let changed = false

    if (!hasJSDoc) {
      content = DEFAULT_JSDOC(icon) + content
      changed = true
      console.log(`${icon}: Added missing JSDoc.`)
    } else if (!hasDocLink) {
      content = content.replace(/(\/\*\*[\S\s]*?\*\/)/, (match): string => {
        if (match.includes('@see ')) return match
        return match.replace('*/', `\n * @see ${pkg.repository.url}/blob/release/src/icons/${icon}\n */`)
      })
      changed = true
      console.log(`${icon}: Added missing doc link in JSDoc`)
    }

    if (!hasProps) {
      content = content.replace(/(import[^;]+;\s*)/, `$1\n${DEFAULT_PROPS}\n`)
      changed = true

      console.log(`${icon}: Added missing prop types.`)
    }

    if (!hasExport) {
      console.log(`${icon}: WARNING: export missing, cannot auto-fix`)
    }

    if (changed) {
      fs.writeFileSync(iconPath, content, 'utf8')
    }
  }

  try {
    execSync('npx prettier --write "src/icons/**/*.tsx"', { stdio: 'inherit' })
    console.log('Prettier formatting complete.')
  } catch (error) {
    console.error('Prettier formatting failed:', error)
    process.exit(1)
  }
}

cycleThroughIcons()
