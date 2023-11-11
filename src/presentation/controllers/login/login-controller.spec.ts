import type { Validation } from '@/presentation/contracts/validation'
import type { HttpRequest } from '@/presentation/http/http'
import { right, type Either } from '@/shared/either'
import { LoginController } from './login-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, null> {
      return right(null)
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: LoginController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new LoginController(validationStub)
  return { sut, validationStub }
}

describe('Login Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com', password: 'any_password'
    })
  })
})
