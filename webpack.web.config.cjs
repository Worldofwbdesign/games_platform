const getConfig = require('startupjs/bundler.cjs').webpackWebConfig

module.exports = getConfig(undefined, {
  forceCompileModules: [
    '@dmapper/auth',
    '@dmapper/auth/isomorphic'
  ],
  alias: {},
  mode: 'react-native'
})
