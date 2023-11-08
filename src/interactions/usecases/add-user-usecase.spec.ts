import type { FetchUserByEmailRepo } from '../contracts/db'
import type { UserModel } from '@/domain/models/db-models'
import type { Hasher } from '../contracts/cryptography'
import type { HashedModel } from '@/domain/models/output-models'
import { User, type UserDto } from '@/domain/entities/user'
import { AddUserUseCase } from './add-user-usecase'
import { left, right } from '@/shared/either'
import { EmailInUseError } from '@/domain/errors'

jest.mock('@/domain/entities/user/user', () => ({
  User: {
    create: jest.fn(() => {
      return right({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    })
  }
}))

const makeFakeUserDto = (): UserDto => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id',
  name: 'any name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  roleId: 'any_role_id',
  createdAt: new Date()
})

const makeFetchUserByEmailRepo = (): FetchUserByEmailRepo => {
  class FetchUserByEmailRepoStub implements FetchUserByEmailRepo {
    async fetchByEmail (email: string): Promise<null | UserModel> {
      return await Promise.resolve(null)
    }
  }
  return new FetchUserByEmailRepoStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hashing (value: string): Promise<HashedModel> {
      return await Promise.resolve({ hash: 'hashed_password' })
    }
  }
  return new HasherStub()
}

interface SutTypes {
  sut: AddUserUseCase
  fetchUserByEmailRepoStub: FetchUserByEmailRepo
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const fetchUserByEmailRepoStub = makeFetchUserByEmailRepo()
  const hasherStub = makeHasher()
  const sut = new AddUserUseCase(fetchUserByEmailRepoStub, hasherStub)
  return { sut, fetchUserByEmailRepoStub, hasherStub }
}

describe('AddUser UseCase', () => {
  it('Should call User Entity with correct values', async () => {
    const { sut } = makeSut()
    const createSpy = jest.spyOn(User, 'create')
    await sut.perform(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith(makeFakeUserDto())
  })

  it('Should return a Error if create User fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(User, 'create').mockReturnValueOnce(
      left(new Error('any_message'))
    )
    const result = await sut.perform(makeFakeUserDto())
    expect(result.value).toEqual(new Error('any_message'))
  })

  it('Should throw if User Entity throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(User, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeUserDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call FetchUserByEmailRepo with correct email', async () => {
    const { sut, fetchUserByEmailRepoStub } = makeSut()
    const fetchByEmailSpy = jest.spyOn(fetchUserByEmailRepoStub, 'fetchByEmail')
    await sut.perform(makeFakeUserDto())
    expect(fetchByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return EmailInUseError if FetchUserByEmailRepo return an UserModel', async () => {
    const { sut, fetchUserByEmailRepoStub } = makeSut()
    jest.spyOn(fetchUserByEmailRepoStub, 'fetchByEmail').mockReturnValueOnce(
      Promise.resolve(makeFakeUserModel())
    )
    const result = await sut.perform(makeFakeUserDto())
    expect(result.value).toEqual(new EmailInUseError('any_email@mail.com'))
  })

  it('Should throw if FetchUserByEmailRepo throws', async () => {
    const { sut, fetchUserByEmailRepoStub } = makeSut()
    jest.spyOn(fetchUserByEmailRepoStub, 'fetchByEmail').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeUserDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashingSpy = jest.spyOn(hasherStub, 'hashing')
    await sut.perform(makeFakeUserDto())
    expect(hashingSpy).toHaveBeenCalledWith('any_password')
  })
})
