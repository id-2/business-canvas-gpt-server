import { InvalidTypeError } from '@/presentation/errors'
import { left } from '@/shared/either'
import { TypeValidation } from './type-validation'

const makeSut = (): TypeValidation => {
  return new TypeValidation('field', 'string')
}

describe('Type Validation', () => {
  it('Should return InvalidTypeError if field type is different from required type', () => {
    const sut = makeSut()
    const result = sut.validate({
      field: 0, otherField: 'other_value'
    })
    expect(result).toEqual(left(new InvalidTypeError('field')))
  })

  it('Should return right result if validation is a success', () => {
    const sut = makeSut()
    const result = sut.validate({
      field: 'any_value', otherField: 'other_value'
    })
    expect(result.isRight()).toBe(true)
  })
})
