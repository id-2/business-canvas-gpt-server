import type { HttpRequest, HttpResponse } from '../http/http'
import type { Middleware } from '../contracts'
import { AccessTokenNotInformedError } from '../errors'
import { unauthorized } from '../helpers/http/http-helpers'

export class AccessControlMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (!accessToken) {
      return unauthorized(new AccessTokenNotInformedError())
    }
    return { body: '', statusCode: 0 }
  }
}
