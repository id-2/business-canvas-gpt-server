import type { Controller, Validation } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/http/http'
import type { Auth } from '@/domain/contracts'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validationComposite: Validation,
    private readonly auth: Auth
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validationComposite.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const { email, password } = httpRequest.body
      await this.auth.perform({ email, password })
      return { statusCode: 0, body: '' }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
