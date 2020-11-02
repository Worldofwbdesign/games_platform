const getConfig = require('startupjs/bundler.cjs').webpackWebConfig

module.exports = getConfig(undefined, {
  forceCompileModules: [
    '@dmapper/auth',
    '@dmapper/auth/isomorphic',
    '@dmapper/chat',
    '@dmapper/time-sync',
    '@dmapper/rich-text-editor'
  ],
  alias: {},
  mode: 'react-native'
})
