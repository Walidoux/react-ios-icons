# 🐢 Getting started

<a href="https://github.com/walidkorchi/react-ios-icons/releases"><img src="https://img.shields.io/github/v/release/walidkorchi/react-ios-icons?label=Latest%20release&style=for-the-badge" alt="Latest release"></a>
<a href="https://www.npmjs.com/package/react-ios-icons"><img src="https://img.shields.io/bundlephobia/minzip/%40walidkorchi/react-ios-icons/1.1.1?style=for-the-badge" alt="Bundle Size"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>

![Preview background library](https://repository-images.githubusercontent.com/682106596/d365cb8c-1ca1-442d-a959-be2b5126e931)

> [!IMPORTANT]
>
> This icon library is currently in active development, we therefore advise you to either:
> - Wait for a more stable version until further notice to use it in your projects, because many things may change
> - Contribute to the project by opening an issue or a pull request.

## ✨ Features

- 📥 Supports around <!-- ICON_COUNT -->206 out of 6,900 SF icons
- ✏️ **Editor Mode** — Dynamically changes position of path icons, with undo/redo actions, and with gzip compression

Does not require SF Pro Display font, only svg paths

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

- [ ] icons : add categories like this : `<Health.Heart />`
- [ ] docs : add themed doc with basic search bar
- [ ] docs : infer icon count variants from tsx files
- [ ] example : draw symetrical alignements lines for x/y axis inside contraints

<details>
    <summary>✅ Completed roadmap (from latest to oldest)</summary>

- [x] example : add undo/redo actions when manipulating svgs
- [x] example : add path optimization for svgs
- [x] code (linter/formatter) : migrate eslint/prettier to biomejs/ultracite toolchain
- [x] example : add editor mode to dynamically adjust path attribute value
- [x] example : add debug mode to display icon contraints for visual consistency following [Apple's icon design best practices](https://developer.apple.com/design/human-interface-guidelines/icons#Best-practices)
- [x] markdown : display the number of icons out of total of SF symbols total icons

</details>
