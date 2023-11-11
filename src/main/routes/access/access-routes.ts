import type { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { signUpControllerFactory } from '@/main/factories/controllers/signup/signup-controller-factory'

export default async (router: Router): Promise<void> => {
  router.post('/signup', adaptRoute(signUpControllerFactory()))
}
