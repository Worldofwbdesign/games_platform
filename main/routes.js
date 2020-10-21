import { isLoggedIn } from './filters'

export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PGames,
    filters: [isLoggedIn]
  },
  {
    path: '/auth/sign-up/professor',
    exact: true,
    component: components.PSignUp
  },
  {
    path: '/library',
    exact: true,
    component: components.PScenarios,
    filters: [isLoggedIn]
  },
  {
    path: '/scenario/:scenarioId',
    exact: true,
    component: components.PScenario,
    filters: [isLoggedIn]
  }
]
