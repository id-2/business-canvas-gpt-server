import type { AccessControlDto } from '@/domain/contracts'
import type { Decrypter } from '@/interactions/contracts/cryptography'
import { AccessControlUseCase } from './access-control-usecase'
import { InvalidTokenError } from '@/domain/errors'

const makeFakeAccessControlDto = (): AccessControlDto => ({
  accessToken: 'any_token',
  role: 'user'
})

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<null | string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: AccessControlUseCase
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new AccessControlUseCase(decrypterStub)
  return { sut, decrypterStub }
}

describe('AccessControl UseCase', () => {
  it('Should call Decrypter with correct token', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.perform(makeFakeAccessControlDto())
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should return InvalidTokenError if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.perform(makeFakeAccessControlDto())
    expect(result.value).toEqual(new InvalidTokenError())
  })
})
