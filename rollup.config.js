import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

import shebang from './rollup-plugin-shebang'

export default [
  {
    input: 'cli.js',
    output: {
      file: 'dist/cli.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // Only transpile our source code
      }),
      terser(),
      shebang()
    ]
  },
  {
    input: 'server.js',
    output: {
      file: 'dist/server.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // Only transpile our source code
      }),
      terser(),
      shebang()
    ]
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // Only transpile our source code
      }),
      terser()
    ]
  }
]
