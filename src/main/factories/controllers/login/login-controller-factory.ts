import type { Controller } from '@/presentation/contracts'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { authUseCaseFactory } from '../../usecases/auth-usecase-factory'
import { loginValidationFactory } from './login-validation-factory'

export const loginControllerFactory = (): Controller => {
  return new LoginController(loginValidationFactory(), authUseCaseFactory())
}
