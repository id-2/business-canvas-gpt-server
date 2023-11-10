import type { AuthDto } from '@/domain/contracts'
import { AuthUseCase } from './auth-usecase'
import { Email } from '@/domain/entities/user/value-objects'
import { right } from '@/shared/either'

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
    const validateEmailSpy = jest.spyOn(Email, 'create')
    await sut.perform(makeFakeAuthDto())
    expect(validateEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
