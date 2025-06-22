/** Audit : Performs checks on icons (docs, matching props) */

import fs from 'node:fs'
import path from 'node:path'

import { ICONS_DIR } from './index.js'

const DEFAULT_JSDOC = `/**
 * Icon component.
 * @see https://github.com/your-repo-link
 */
`

const DEFAULT_PROPS = `interface IconProps {
  // Add your props here
}
`

const cycleThroughIcons = (): void => {
  for (const icon of fs.readdirSync(ICONS_DIR)) {
    const iconPath = path.join(ICONS_DIR, icon)
    const content = fs.readFileSync(iconPath, 'utf8')

    const hasJSDoc = /\/\*\*([\S\s]*?)\*\//.test(content)
    const hasExport = /export const /i.test(content)
    const hasProps = /interface \w+Props/.test(content)
    const hasDocLink = /@see https?:\/\//.test(content)

    if (!hasJSDoc || !hasExport || !hasProps || !hasDocLink) {
      console.log(`\n${icon} is missing:`)
      if (!hasJSDoc) {
        console.log('  - JSDoc (would add):\n' + DEFAULT_JSDOC)
      }
      if (!hasExport) {
        console.log('  - export (cannot auto-fix, please check manually)')
      }
      if (!hasProps) {
        console.log('  - prop types (would add):\n' + DEFAULT_PROPS)
      }
      if (!hasDocLink && hasJSDoc) {
        console.log('  - doc link (would add to JSDoc):\n * @see https://github.com/your-repo-link')
      }
    }
  }
}

cycleThroughIcons()
