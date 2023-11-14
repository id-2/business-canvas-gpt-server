import type { HttpRequest, HttpResponse } from '../http/http'
import type { Middleware } from '../contracts'
import type { AccessControl } from '@/domain/contracts'
import type { Role } from '@/domain/models/db-models'
import { AccessTokenNotInformedError } from '../errors'
import { unauthorized } from '../helpers/http/http-helpers'

export class AccessControlMiddleware implements Middleware {
  constructor (
    private readonly accessControl: AccessControl,
    private readonly requiredRole: Role
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (!accessToken) {
      return unauthorized(new AccessTokenNotInformedError())
    }
    const accessControlResul = await this.accessControl.perform({
      accessToken, requiredRole: this.requiredRole
    })
    if (accessControlResul.isLeft()) {
      return unauthorized(accessControlResul.value)
    }
    return { body: '', statusCode: 0 }
  }
}
