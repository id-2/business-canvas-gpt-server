import { left } from '@/shared/either'
import { UnnecessaryFieldError } from '@/presentation/errors'
import { OnlyRequiredFieldsValidation } from './only-required-fields-validation'

const makeSut = (): OnlyRequiredFieldsValidation => {
  return new OnlyRequiredFieldsValidation(['field', 'otherField'])
}

describe('OnlyRequiredField Validation', () => {
  it('Should return UnnecessaryFieldError if received field unnecessary', () => {
    const sut = makeSut()
    const result = sut.validate({
      field: 'any_value',
      otherField: 'other_value',
      anotherField: 'another_value'
    })
    expect(result).toEqual(left(new UnnecessaryFieldError('anotherField')))
  })
})
