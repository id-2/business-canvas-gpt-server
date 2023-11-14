import type { AccessControlDto } from '@/domain/contracts'
import type { Decrypter } from '@/interactions/contracts/cryptography'
import type { UserModel } from '@/domain/models/db-models'
import type { LoadUserByIdRepo } from '@/interactions/contracts/db/load-user-by-id-repo'
import { AccessControlUseCase } from './access-control-usecase'
import { AccessDeniedError, InvalidTokenError } from '@/domain/errors'

const makeFakeAccessControlDto = (): AccessControlDto => ({
  accessToken: 'any_token',
  role: 'admin'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id',
  name: 'any name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<null | string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

const makeLoadUserByIdRepo = (): LoadUserByIdRepo => {
  class LoadUserByIdRepoStub implements LoadUserByIdRepo {
    async loadById (id: string): Promise<null | UserModel> {
      return await Promise.resolve(makeFakeUserModel())
    }
  }
  return new LoadUserByIdRepoStub()
}

interface SutTypes {
  sut: AccessControlUseCase
  decrypterStub: Decrypter
  loadUserByIdRepoStub: LoadUserByIdRepo
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadUserByIdRepoStub = makeLoadUserByIdRepo()
  const sut = new AccessControlUseCase(decrypterStub, loadUserByIdRepoStub)
  return { sut, decrypterStub, loadUserByIdRepoStub }
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
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeAccessControlDto())
    expect(result.value).toEqual(new InvalidTokenError())
  })

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAccessControlDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call LoadUsertById with correct Id', async () => {
    const { sut, loadUserByIdRepoStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepoStub, 'loadById')
    await sut.perform(makeFakeAccessControlDto())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return AccessDeniedError if LoadUsertById returns null', async () => {
    const { sut, loadUserByIdRepoStub } = makeSut()
    jest.spyOn(loadUserByIdRepoStub, 'loadById').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeAccessControlDto())
    expect(result.value).toEqual(new AccessDeniedError())
  })

  it('Should throw if LoadUsertById throws', async () => {
    const { sut, loadUserByIdRepoStub } = makeSut()
    jest.spyOn(loadUserByIdRepoStub, 'loadById').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeAccessControlDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should return AccessDeniedError if the user role is different from the required role', async () => {
    const { sut, loadUserByIdRepoStub } = makeSut()
    const user = makeFakeUserModel()
    user.role = 'user'
    jest.spyOn(loadUserByIdRepoStub, 'loadById').mockReturnValueOnce(
      Promise.resolve(user)
    )
    const result = await sut.perform(makeFakeAccessControlDto())
    expect(result.value).toEqual(new AccessDeniedError())
  })
})
