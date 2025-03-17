import { canActivateAuth } from './auth/access.guard'
import { authTokenInterceptorFn } from './auth/auth.interseptor'
import { AuthService } from '@tt/data-access/auth/service/auth.service'

export * from './feature-login'
export {
  canActivateAuth,
  authTokenInterceptorFn,
  AuthService,
}

