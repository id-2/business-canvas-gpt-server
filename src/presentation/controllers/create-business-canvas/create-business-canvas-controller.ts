import type { Controller, Validation } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/http/http'
import { badRequest } from '@/presentation/helpers/http/http-helpers'

export class CreateBusinessCanvasController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationResult = this.validation.validate(httpRequest.body)
    if (validationResult.isLeft()) {
      return badRequest(validationResult.value)
    }
    return { statusCode: 0, body: '' }
  }
}
