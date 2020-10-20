import init from 'startupjs/init'
import orm from '../model'
import startupjsServer from 'startupjs/server'
import api from './api'
import getMainRoutes from '../main/routes'
import { initApp } from 'startupjs/app/server'
import { initAuth } from '@dmapper/auth/server'
import { getAuthRoutes } from '@dmapper/auth/isomorphic'

// Init startupjs ORM.
init({ orm })

// Check '@startupjs/server' readme for the full API
startupjsServer({
  getHead,
  appRoutes: [
    ...getMainRoutes(),
    ...getAuthRoutes()
  ]
}, (ee, options) => {
  initApp(ee)
  initAuth(ee, {
    strategies: {
      local: {
        hooks: {}
      }
    }
  })

  ee.on('routes', expressApp => {
    expressApp.use('/api', api)
  })
})

function getHead (appName) {
  return `
    <title>Games platform</title>
    <!-- Put vendor JS and CSS here -->
  `
}

export default function run () {}
