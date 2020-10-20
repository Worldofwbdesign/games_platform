const getConfig = require('startupjs/bundler.cjs').webpackServerConfig

module.exports = getConfig(undefined, {
  forceCompileModules: [
    '@dmapper/auth/server',
    '@dmapper/auth/isomorphic'
  ],
  alias: {}
})
