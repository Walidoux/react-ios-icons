# 🐢 Getting started

![Preview background library](https://repository-images.githubusercontent.com/682106596/d365cb8c-1ca1-442d-a959-be2b5126e931)

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

// Fills three-fourths of the battery's capacity
export const DummyComponent: React.FC = () => {
  return <Battery progression={75} />
}
```

#### Example 2

```tsx
import { Bolt } from 'react-ios-icons'

export const DummyComponent: React.FC = () => {
  return <Bolt filled disabled circled />
}
```

## Contributing

If you would like to contribute and improve our project, we've set certain rules to maintain a better scoial and development environment, almost everything is mentioned in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### Where do I start?

In order to create an icon, you need to generate one by executing:

> `npm run generate:icon <ComponentName>`

You will be prompted with a few questions to help generate starter code for your icon.
