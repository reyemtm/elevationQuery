import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/elevationQuery.js',
    output: {
      file: 'dist/elevationQuery.min.js',
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