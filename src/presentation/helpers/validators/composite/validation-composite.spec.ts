import type { Validation } from '@/presentation/contracts'
import { type Either, left, right } from '@/shared/either'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, null> {
      return right(null)
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite([validationStubs[0], validationStubs[1]])
  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(
      left(new Error('field'))
    )
    const result = sut.validate({ otherField: 'other_value' })
    expect(result.value).toEqual(new Error('field'))
  })
})
