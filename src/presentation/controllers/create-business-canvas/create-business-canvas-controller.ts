import type { Controller, Validation } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/http/http'
import type { CreateBusinessCanvas } from '@/domain/contracts'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helpers'

export class CreateBusinessCanvasController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createBusinessCanvas: CreateBusinessCanvas
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const { userId } = httpRequest.headers
      const createBusinessCanvasResult = await this.createBusinessCanvas.perform({
        ...(userId && { userId }), answers: httpRequest.body
      })
      if (createBusinessCanvasResult.isLeft()) {
        return badRequest(createBusinessCanvasResult.value)
      }
      return { statusCode: 0, body: '' }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
