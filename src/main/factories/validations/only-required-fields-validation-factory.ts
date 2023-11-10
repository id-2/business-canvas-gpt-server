import type { Validation } from '@/presentation/contracts'
import { OnlyRequiredFieldsValidation } from '@/presentation/helpers/validators/only-required-fields/only-required-fields-validation'

export const onlyRequiredFieldsValidationFactory = (requiredFields: string[]): Validation => {
  return new OnlyRequiredFieldsValidation(requiredFields)
}
