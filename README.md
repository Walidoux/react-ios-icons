# 🐢 Getting started

![Preview background library](https://images-ext-1.discordapp.net/external/5FmI3faZKSbqTgCAbZyMCBkV7HqecTtWENJZxE7xC5w/https/repository-images.githubusercontent.com/524621830/67536f3d-3efe-4c39-95f5-74a8cba31af0?width=1178&height=662)

## Table of Content

- [Setup](#setup)
- [Contributing](#contributing)
  - [Where do I start?](#where-do-i-start)
  - [Code Of Conduct](./CODE_OF_CONDUCT.md)

## Setup

### Install the dependency

Depdending on your package manager, here are two examples:

> NPM : `npm install react-ios-icons` \
> YARN : `yarn add react-ios-icons`

### Import an icon

#### Example 1

```tsx
import { Battery } from 'react-ios-icons'

// Renders the one-fifth of battery's capacity
export const DummyComponent: React.FC = () => {
  return <Battery progression={75} />
}
```

#### Example 2

```tsx
import {} from 'react-ios-icons'
```

## Contributing

If you would like to contribute and improve our project, we've set certain rules to maintain a better scoial and development environment, almost everything is mentioned in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### Where do I start?

In order to create an icon, you need to generate one by executing:

> NPM : `npm run generate <ComponentName>` \
> YARN : `yarn generate <ComponentName>`

2 questions will be asked to you which helps giving instructions that will be provide a start code for your icon.
