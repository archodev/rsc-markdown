import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts', // Your main TypeScript file
  output: [
    {
      file: 'dist/bundle.js', // Output bundle location
      format: 'es', // CommonJS module, change to 'es' for ES modules
      compact: true,
    },
  ],
  plugins: [
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript(), // TypeScript plugin
    terser(),
  ],
};
