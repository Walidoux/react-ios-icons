import path from 'node:path'
import fs from 'node:fs'

import chalk from 'chalk'
import hbs_helpers from 'handlebars-helpers'

const iconsList = fs
  .readdirSync(path.join(process.cwd(), 'src/icons'))
  .map((item) => item.substring(0, item.lastIndexOf('.')) || item)

export default (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  const helpers = hbs_helpers()

  for (const prop in helpers) {
    if (!prop.toLowerCase().includes('case')) {
      plop.setHelper(prop, helpers[prop])
    }
  }

  plop.setGenerator('icon', {
    description: '📦 generate a new Icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to call your icon?',
        validate: (icon) => {
          if (icon === '') return chalk.red('⛔ Icon name cannot be empty')
          else if (iconsList.includes(icon)) return chalk.red('⛔ Already exists')
          else return true
        }
      },
      {
        type: 'confirm',
        name: 'hasFilledProp',
        message: `Will this icon have the ${chalk.blue('filled')} prop?`
      },
      {
        type: 'confirm',
        name: 'hasDisableProp',
        message: `Will this icon have the ${chalk.yellowBright('disabled')} prop?`
      },
      {
        type: 'confirm',
        name: 'hasCustomProps',
        message: `Will it have other ${chalk.greenBright('custom')} props?`
      },
      {
        type: 'number',
        name: 'variantsCount',
        message: 'How many variants are you expecting for this icon?'
      }
    ],
    actions() {
      const currentActions = [
        {
          type: 'add',
          path: 'src/icons/{{ properCase name }}.tsx',
          templateFile: 'generators/Icon.tsx.hbs'
        },
        {
          type: 'append',
          path: 'src/index.ts',
          pattern: /(\/{3} @PLOP_EXPORTS)/g,
          template: "export { {{ properCase name }} } from './icons/{{ properCase name }}'"
        }
      ]

      return currentActions
    }
  })
}
