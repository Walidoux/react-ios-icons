import type { Options } from 'tsup'

import tsconfig from './tsconfig.json'

export const tsup = {
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  external: ['react'],
  target: tsconfig.compilerOptions.target as Options['target'],
  treeshake: true,
  minify: true,
  clean: true,
  dts: true
} satisfies Options
