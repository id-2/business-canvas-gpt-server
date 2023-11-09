import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (fieldName: string, fieldToCompareName: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(fieldName, fieldToCompareName)
}

describe('CompareFields Validation', () => {
  it('Should return InvalidaParamError if the comparation fails', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const result = sut.validate({
      field: 'any_value', fieldToCompare: 'invalid_value'
    })
    expect(result.value).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('Should return right result if compartion is a success', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const result = sut.validate({
      field: 'any_value', fieldToCompare: 'any_value'
    })
    expect(result.isRight()).toBe(true)
  })
})
