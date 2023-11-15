import type { HashedModel } from '@/domain/models/output-models'
import type { Hasher } from '../../../contracts/cryptography'
import { AddRandomUserUseCase } from './add-random-user-usecase'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hashing (value: string): Promise<HashedModel> {
      return await Promise.resolve({ hash: 'hashed_password' })
    }
  }
  return new HasherStub()
}

interface SutTypes {
  sut: AddRandomUserUseCase
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const sut = new AddRandomUserUseCase(hasherStub)
  return { sut, hasherStub }
}

describe('AddRandomUser UseCase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashingSpy = jest.spyOn(hasherStub, 'hashing')
    await sut.perform()
    expect(hashingSpy).toHaveBeenCalledWith('any_password')
  })
})
