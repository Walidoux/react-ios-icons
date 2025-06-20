const path = require('node:path')
const fs = require('node:fs')

const chalk = require('chalk')
const helpers = require('handlebars-helpers')()

const iconsList = fs
  .readdirSync(path.join(__dirname, 'src/icons'))
  .map((item) => item.substring(0, item.lastIndexOf('.')) || item)

module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
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
