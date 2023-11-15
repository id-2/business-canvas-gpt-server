import type { HashedModel, IdModel } from '@/domain/models/output-models'
import type { Hasher } from '@/interactions/contracts/cryptography'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import { AddRandomUserUseCase } from './add-random-user-usecase'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hashing (value: string): Promise<HashedModel> {
      return await Promise.resolve({ hash: 'hashed_password' })
    }
  }
  return new HasherStub()
}

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): IdModel {
      return { id: 'any_id' }
    }
  }
  return new IdBuilderStub()
}

interface SutTypes {
  sut: AddRandomUserUseCase
  hasherStub: Hasher
  idBuilderStub: IdBuilder
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const idBuilderStub = makeIdBuilder()
  const sut = new AddRandomUserUseCase(hasherStub, idBuilderStub)
  return { sut, hasherStub, idBuilderStub }
}

describe('AddRandomUser UseCase', () => {
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
})
