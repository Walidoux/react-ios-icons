# 🐢 Getting started

![Preview background library](https://repository-images.githubusercontent.com/682106596/d365cb8c-1ca1-442d-a959-be2b5126e931)

## ✨ Features

- Supports <!-- ICON_COUNT -->111 out of 6,000 SF icons

## 🚀 Quick Start

Depdending on your package manager (we use [bun](https://bun.sh)), install the package :

> `bun install react-ios-icons`

And the icon into your code like that :

```tsx
import { Battery } from 'react-ios-icons'

// Fills three-fourths of the battery's capacity
export const DummyComponent: React.FC = () => {
  return <Battery progression={75} />
}
```

## 🌱 Contributing

If you would like to contribute and improve our project, we've set certain rules to maintain a better scoial and development environment, almost everything is mentioned in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### Where do I start?

In order to create an icon, you need to generate one by executing:

> `bun run generate:icon <component_name>`

You will be prompted with a few questions to help generate starter code for your icon.

## 📍 Roadmap

- [x] docs : display the number of icons out of total of SF symbols total icons
- [ ] example : add debug mode to display icon contraints for visual consistency following [Apple's icon design best practices](https://developer.apple.com/design/human-interface-guidelines/icons#Best-practices)
- [ ] icons : add categories using nested objects
