import { isLoggedIn } from './filters'

export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PGames,
    filters: [isLoggedIn]
  },
  {
    path: '/auth/signup',
    exact: true,
    component: components.PSignUp
  },
  {
    path: '/about',
    exact: true,
    component: components.PAbout,
    filters: [isLoggedIn]
  }
]
