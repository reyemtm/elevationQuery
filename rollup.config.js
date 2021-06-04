import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es',
      compact: true
    },
    plugins: [nodeResolve()],
  },
  {
    input: 'src/elevationQueryUMD.js',
    output: {
      file: 'docs/elevationQueryUMD.min.js',
      format: 'umd',
      name: "elQ",
      compact: true
    },
    plugins: [nodeResolve()],
  }
]