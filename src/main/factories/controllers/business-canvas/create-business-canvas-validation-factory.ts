import type { Validation } from '@/presentation/contracts'
import { listCompositeValidationFactory } from '@/main/factories/validations/list-composite-validation-factory'
import { requiredFieldValidationFactory, typeValidationFactory } from '@/main/factories/validations'
import { someFieldMandatoryValidationFactory } from '@/main/factories/validations/some-field-be-mandadory-validation'

export const createBusinessCanvasValidationFactory = (): Validation => {
  return listCompositeValidationFactory([
    requiredFieldValidationFactory('questionId'),
    someFieldMandatoryValidationFactory(['alternativeId', 'answer']),
    typeValidationFactory('questionId', 'string')
  ])
}
