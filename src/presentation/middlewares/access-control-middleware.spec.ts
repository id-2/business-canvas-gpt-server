import { AccessTokenNotInformedError } from '../errors'
import { unauthorized } from '../helpers/http/http-helpers'
import { AccessControlMiddleware } from './access-control-middleware'

interface SutTypes {
  sut: AccessControlMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AccessControlMiddleware()
  return { sut }
}

describe('AccessControl Middleware', () => {
  it('Should return 401 if x-access-token not provided in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized(new AccessTokenNotInformedError()))
  })
})
