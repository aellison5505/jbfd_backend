import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'build/index.js',
  output: {
    file: 'out/bundle.js',
    format: 'cjs'
  },
  plugins: [

    commonjs(),
      resolve()
  ]
};
