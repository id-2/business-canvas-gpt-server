import type { Validation } from '@/presentation/contracts'
import { CompareFieldsValidation } from '@/presentation/helpers/validators/compare-fields/compare-fields-validation'

export const compareFieldsValidationFactory = (
  fieldName: string, fieldNameToCompare: string
): Validation => {
  return new CompareFieldsValidation(fieldName, fieldNameToCompare)
}
