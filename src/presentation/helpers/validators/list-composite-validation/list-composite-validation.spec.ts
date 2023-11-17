import type { Validation } from '@/presentation/contracts'
import { right, type Either } from '@/shared/either'
import { ListCompositeValidation } from './list-composite-validation'

const makeFakeInput = (): any => ([
  { anyField: 'any_value' },
  { otherField: 'other_value' }
])

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, null> {
      return right(null)
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ListCompositeValidation
  validationsStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validationsStub = [makeValidation(), makeValidation()]
  const sut = new ListCompositeValidation([validationsStub[0], validationsStub[1]])
  return { sut, validationsStub }
}

describe('ListComposite Validation', () => {
  it('Should call Validations with correct values', async () => {
    const { sut, validationsStub } = makeSut()
    const validateSpy = jest.spyOn(validationsStub[0], 'validate')
    sut.validate(makeFakeInput())
    expect(validateSpy).toHaveBeenCalledWith({ anyField: 'any_value' })
    expect(validateSpy).toHaveBeenCalledWith({ otherField: 'other_value' })
  })
})
