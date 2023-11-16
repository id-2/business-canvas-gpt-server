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
      await this.createBusinessCanvas.perform({
        userId, answers: httpRequest.body
      })
      return { statusCode: 0, body: '' }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
