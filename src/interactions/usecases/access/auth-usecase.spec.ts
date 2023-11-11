import type { FetchUserByEmailRepo } from '@/interactions/contracts/db'
import type { UserModel } from '@/domain/models/db-models'
import type { AuthDto } from '@/domain/contracts'
import { AuthUseCase } from './auth-usecase'
import { Email } from '@/domain/entities/user/value-objects'
import { left, right } from '@/shared/either'
import { InvalidEmailError } from '@/domain/entities/user/errors'
import { InvalidCredentialsError } from '@/domain/errors'

jest.mock('@/domain/entities/user/value-objects/email/email', () => ({
  Email: {
    create: jest.fn(() => { return right({ email: 'any_email@mail.com' }) })
  }
}))

const makeFakeAuthDto = (): AuthDto => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeFetchUserByEmailRepo = (): FetchUserByEmailRepo => {
  class FetchUserByEmailRepoStub implements FetchUserByEmailRepo {
    async fetchByEmail (email: string): Promise<null | UserModel> {
      return await Promise.resolve(makeFakeUserModel())
    }
  }
  return new FetchUserByEmailRepoStub()
}

interface SutTypes {
  sut: AuthUseCase
  fetchUserByEmailRepoStub: FetchUserByEmailRepo
}

const makeSut = (): SutTypes => {
  const fetchUserByEmailRepoStub = makeFetchUserByEmailRepo()
  const sut = new AuthUseCase(fetchUserByEmailRepoStub)
  return { sut, fetchUserByEmailRepoStub }
}

describe('Auth UseCase', () => {
  it('Should call Email Value Object with correct email', async () => {
    const { sut } = makeSut()
    const createSpy = jest.spyOn(Email, 'create')
    await sut.perform(makeFakeAuthDto())
    expect(createSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return InvalidEmailError if Email Value Object returns InvalidEmailError', async () => {
    const { sut } = makeSut()
    jest.spyOn(Email, 'create').mockReturnValueOnce(
      left(new InvalidEmailError('any_email@mail.com'))
    )
    const result = await sut.perform(makeFakeAuthDto())
    expect(result.value).toEqual(new InvalidEmailError('any_email@mail.com'))
  })

  it('Should throw if Email Value Object throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Email, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.perform(makeFakeAuthDto())
    await expect(promise).rejects.toThrow()
  })

  it('Should call FetchUserByEmailRepo with correct email', async () => {
    const { sut, fetchUserByEmailRepoStub } = makeSut()
    const fetchByEmailSpy = jest.spyOn(fetchUserByEmailRepoStub, 'fetchByEmail')
    await sut.perform(makeFakeAuthDto())
    expect(fetchByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return InvalidCredentialsError if FetchUserByEmailRepo returns null', async () => {
    const { sut, fetchUserByEmailRepoStub } = makeSut()
    jest.spyOn(fetchUserByEmailRepoStub, 'fetchByEmail').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeAuthDto())
    expect(result.value).toEqual(new InvalidCredentialsError())
  })
})
