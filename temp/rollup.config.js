import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
	input: 'index.js',
	output: [
		{
			file: 'dist/usgs_elevation.js',
			format: 'cjs'
		}
  ],
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    })
  ]
};