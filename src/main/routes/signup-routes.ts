import type { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
