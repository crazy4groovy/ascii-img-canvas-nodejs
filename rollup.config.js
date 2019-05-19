import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
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
      })
    ]
  }
]
