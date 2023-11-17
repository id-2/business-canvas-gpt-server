import { adaptRoute } from '@/main/adapters'
import { createBusinessCanvasControllerFactory } from '@/main/factories/controllers/business-canvas/create-business-canvas-controller-factory'
import type { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post('/business-canvas',
    adaptRoute(createBusinessCanvasControllerFactory())
  )
}
