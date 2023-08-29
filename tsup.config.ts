import type { Options } from 'tsup'

import tsconfig from './tsconfig.json'

const inputPath = 'src/index.ts'

export const tsup = {
  format: 'esm',
  entry: [inputPath],
  dts: inputPath,
  target: tsconfig.compilerOptions.target as Options['target'],
  treeshake: true,
  minify: 'terser',
  clean: true
} satisfies Options
