import type { HashedModel, IdModel } from '@/domain/models/output-models'
import type { Hasher } from '@/interactions/contracts/cryptography'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import type { UserModel } from '@/domain/models/db-models'
import type { AddUserRepo } from '@/interactions/contracts/db'
import { AddRandomUserUseCase } from './add-random-user-usecase'
import MockDate from 'mockdate'

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id_1',
  name: 'Convidado',
  email: 'any_id_2@convidado.com',
  password: 'hashed_password',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hashing (value: string): Promise<HashedModel> {
      return await Promise.resolve({ hash: 'hashed_password' })
    }
  }
  return new HasherStub()
}

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderSpy implements IdBuilder {
    private callsCount = 0
    build (): IdModel {
      this.callsCount++
      return { id: `any_id_${this.callsCount}` }
    }
  }
  return new IdBuilderSpy()
}

const makeAddUserRepo = (): AddUserRepo => {
  class AddUserRepoStub implements AddUserRepo {
    async add (data: UserModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddUserRepoStub()
}

interface SutTypes {
  sut: AddRandomUserUseCase
  hasherStub: Hasher
  idBuilderStub: IdBuilder
  addUserRepoStub: AddUserRepo
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const idBuilderStub = makeIdBuilder()
  const addUserRepoStub = makeAddUserRepo()
  const sut = new AddRandomUserUseCase(hasherStub, idBuilderStub, addUserRepoStub)
  return { sut, hasherStub, idBuilderStub, addUserRepoStub }
}

describe('AddRandomUser UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashingSpy = jest.spyOn(hasherStub, 'hashing')
    await sut.perform()
    expect(hashingSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hashing').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call IdBuilder', async () => {
    const { sut, idBuilderStub } = makeSut()
    const buildSpy = jest.spyOn(idBuilderStub, 'build')
    await sut.perform()
    expect(buildSpy).toHaveBeenCalled()
  })

  it('Should throw if IdBuilder throws', async () => {
    const { sut, idBuilderStub } = makeSut()
    jest.spyOn(idBuilderStub, 'build').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddUserRepo with correct values', async () => {
    const { sut, addUserRepoStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepoStub, 'add')
    await sut.perform()
    expect(addSpy).toHaveBeenCalledWith(makeFakeUserModel())
  })
})
