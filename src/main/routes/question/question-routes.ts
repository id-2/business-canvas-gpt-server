import type { Router } from 'express'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { fetchAllQuestionsControllerFactory } from '@/main/factories/controllers/question/fetch-all-questions-controller-factory'
import { accessControlMiddlewareFactory } from '@/main/factories/middlewares/access-control-middleware-factory'

export default async (router: Router): Promise<void> => {
  router.get('/question',
    adaptMiddleware(accessControlMiddlewareFactory('user')),
    adaptRoute(fetchAllQuestionsControllerFactory())
  )
}
