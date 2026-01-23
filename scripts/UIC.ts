/** Update Icon Count : Script to count icon variants from JSDoc comments and update markdown */

import fs from 'node:fs'
import path from 'node:path'

import chalk from 'chalk'

import { ICONS_DIR, PLACEHOLDER_ICON_COUNT, README_PATH } from '.'

const variantRegex = /icon with (\d+) variants/i

const extractVariantCount = (content: string): number => {
  const match = content.match(variantRegex)
  return match != null ? Number.parseInt(match[1] as string, 10) : 1 // fallback to 1 if no match found meaning icon has no variants
}

const getTotalVariants = (): number => {
  let total = 0

  for (const file of fs
    .readdirSync(ICONS_DIR)
    .filter((f) => f.endsWith('.tsx'))) {
    const filePath = path.join(ICONS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    total += extractVariantCount(content)
  }

  return total
}

const getCurrentTotalFromReadme = (): number => {
  const readme = fs.readFileSync(README_PATH, 'utf8')
  const regex = new RegExp(`${PLACEHOLDER_ICON_COUNT}\\s*(\\d+)`)
  const match = readme.match(regex)
  return match != null ? Number.parseInt(match[1] as string, 10) : 0
}

const updateReadme = (total: number) => {
  const regex = new RegExp(`${PLACEHOLDER_ICON_COUNT}(\\s*\\d+)?`)
  let readme = fs.readFileSync(README_PATH, 'utf8')

  if (regex.test(readme)) {
    readme = readme.replace(regex, `${PLACEHOLDER_ICON_COUNT}${total}`)
  } else {
    console.error(chalk.red('Error : Placeholder not found or unrecognized'))
    process.exit(1)
  }

  return fs.writeFileSync(README_PATH, readme)
}

const oldTotal = getCurrentTotalFromReadme()
const total = getTotalVariants()

if (oldTotal !== total) {
  updateReadme(total)
  console.log(
    chalk.green(
      `Updated README with total icon variants: from ${oldTotal} to ${total}`
    )
  )
} else {
  console.log(chalk.yellow('No changes needed'))
}
