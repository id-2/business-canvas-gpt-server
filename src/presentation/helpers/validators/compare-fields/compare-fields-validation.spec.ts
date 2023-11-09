import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (fieldName: string, fieldToCompareName: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(fieldName, fieldToCompareName)
}

describe('CompareFields Validation', () => {
  it('Should return InvalidaParamError if the comparation fails', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const result = sut.validate({
      field: 'any_field', fieldToCompare: 'invalid_field'
    })
    expect(result.value).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
