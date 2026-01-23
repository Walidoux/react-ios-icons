# 🐢 Getting started

![Preview background library](https://repository-images.githubusercontent.com/682106596/d365cb8c-1ca1-442d-a959-be2b5126e931)

## ✨ Features

- 📥 Supports <!-- ICON_COUNT -->115 out of 6,000 SF icons
- ✏️ **Editor Mode** — Dynamically changes position of path icons

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

- [x] markdown : display the number of icons out of total of SF symbols total icons
- [x] example : add debug mode to display icon contraints for visual consistency following [Apple's icon design best practices](https://developer.apple.com/design/human-interface-guidelines/icons#Best-practices)
- [ ] icons : add categories like this : `<Health.Heart />`
- [ ] docs : add themed doc with basic search bar
- [x] example : add editor mode to dynamically adjust path attribute value
- [ ] docs : infer icon count variants from tsx files
- [ ] example : draw symetrical alignements lines for x/y axis inside contraints
- [ ] code (linter/formatter) : migrate eslint/prettier to biomejs
