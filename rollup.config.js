import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import alias from 'rollup-plugin-alias'


var env = process.env.NODE_ENV
var config = {
  output: {
    name: 'Cake',
    format: 'umd'
  },
  external: ['react'],
  globals: {react: 'React'},
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/react.js': ['createElement'],
        'node_modules/react-dom/**': ['createPortal'],
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}


if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        dead_code: true
      }
    })
  )
}


export default config
