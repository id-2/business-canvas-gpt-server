import type { AuthDto } from '@/domain/contracts'
import { AuthUseCase } from './auth-usecase'
import { Email } from '@/domain/entities/user/value-objects'
import { left, right } from '@/shared/either'
import { InvalidEmailError } from '@/domain/entities/user/errors'

jest.mock('@/domain/entities/user/value-objects/email/email', () => ({
  Email: {
    create: jest.fn(() => { return right({ email: 'any_email@mail.com' }) })
  }
}))

const makeFakeAuthDto = (): AuthDto => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: AuthUseCase
}

const makeSut = (): SutTypes => {
  const sut = new AuthUseCase()
  return { sut }
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
})
