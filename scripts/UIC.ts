// Script to count icon variants from JSDoc comments and update README.md

import fs from 'node:fs'
import path from 'node:path'

import chalk from 'chalk'

const ICONS_DIR = path.join(process.cwd(), 'src', 'icons')
const README_PATH = path.join(process.cwd(), 'README.md')
const PLACEHOLDER = '<!-- ICON_COUNT -->'

const extractVariantCount = (content: string): number => {
  const match = content.match(/icon with (\d+) variants/i)
  return match != null ? Number.parseInt(match[1] as string, 10) : 0
}

const getTotalVariants = (): number => {
  let total = 0

  for (const file of fs.readdirSync(ICONS_DIR).filter((f) => f.endsWith('.tsx'))) {
    const filePath = path.join(ICONS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    total += extractVariantCount(content)
  }

  return total
}

const updateReadme = (total: number): void => {
  const regex = new RegExp(`${PLACEHOLDER}(\\s*\\d+)?`)
  let readme = fs.readFileSync(README_PATH, 'utf8')

  if (regex.test(readme)) {
    readme = readme.replace(regex, `${PLACEHOLDER}${total}`)
  } else {
    console.error(chalk.red('Error : Placeholder not found or unrecognized'))
    process.exit(1)
  }

  return fs.writeFileSync(README_PATH, readme)
}

const total = getTotalVariants()
updateReadme(total)
console.log(chalk.green(`Updated README with total icon variants: ${total}`))
