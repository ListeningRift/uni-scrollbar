const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');
const postcss = require('rollup-plugin-postcss');
const dts = require('rollup-plugin-dts');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const path = require('path');

const pkg = require('./package.json');

const extensions = ['.js', '.ts'];
const exclude = ['./node_modules/**'];
const include = ['packages/**/*.ts'];

const distPath = './dist'

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = [
  {
    input: './packages/index.ts',
    output: [
      {
        file: resolve(distPath, pkg.main),
        format: 'cjs',
        entryFileNames: pkg.main
      },
      {
        file: resolve(distPath, pkg.module),
        format: 'esm',
        entryFileNames: pkg.main
      },
      {
        file: resolve(distPath, pkg.browser),
        format: 'umd',
        entryFileNames: pkg.main,
        name: 'UScrollbar'
      }
    ],
    plugins: [
      nodeResolve({
        preferredBuiltins: false
      }),
      typescript({
        module: 'ESNext',
        include,
        exclude,
        tsconfig: './tsconfig.json'
      }),
      babel({
        extensions,
        include,
        exclude,
        babelHelpers: 'runtime',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3
            }
          ]
        ]
      }),
      commonjs({
        extensions
      }),
      livereload({
        watch: [
          'dist/lib',
          'dist/styles',
          'examples'
        ]
      }),
      serve({
        open: true,
        port: 8000,
        openPage: '/examples/index.html'
      })
    ]
  },
  {
    input: './packages/index.ts',
    output: [
      {
        file: resolve(distPath, pkg.typings),
        format: 'es'
      }
    ],
    plugins: [
      dts.default()
    ]
  },
  {
    input: './styles/index.scss',
    output: [
      {
        file: resolve(distPath, pkg.styles)
      }
    ],
    plugins: [
      postcss({
        use: ['sass'],
        extensions: ['.scss'],
        extract: 'index.css'
      })
    ]
  }
]
