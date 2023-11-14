import type { AccessControl, AccessControlDto, AccessControlRes } from '@/domain/contracts'
import type { HttpRequest } from '../http/http'
import { AccessTokenNotInformedError } from '../errors'
import { unauthorized } from '../helpers/http/http-helpers'
import { AccessControlMiddleware } from './access-control-middleware'
import { right } from '@/shared/either'

const makeFakeRequest = (): HttpRequest => ({
  headers: { 'x-access-token': 'any_token' }
})

const makeFakeAccessControlDto = (): AccessControlDto => ({
  accessToken: 'any_token',
  requiredRole: 'admin'
})

const makeAccessControl = (): AccessControl => {
  class AccessControlStub implements AccessControl {
    async perform (data: AccessControlDto): Promise<AccessControlRes> {
      return await Promise.resolve(right({ userId: 'any_id' }))
    }
  }
  return new AccessControlStub()
}

interface SutTypes {
  sut: AccessControlMiddleware
  accessControlStub: AccessControl
}

const makeSut = (): SutTypes => {
  const accessControlStub = makeAccessControl()
  const sut = new AccessControlMiddleware(accessControlStub, 'admin')
  return { sut, accessControlStub }
}

describe('AccessControl Middleware', () => {
  it('Should return 401 if x-access-token not provided in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized(new AccessTokenNotInformedError()))
  })

  it('Should call AccessControl with correct values', async () => {
    const { sut, accessControlStub } = makeSut()
    const performSpy = jest.spyOn(accessControlStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith(makeFakeAccessControlDto())
  })
})
