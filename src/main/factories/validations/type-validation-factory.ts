import type { Validation } from '@/presentation/contracts'
import { type FieldType, TypeValidation } from '@/presentation/helpers/validators/type/type-validation'

export const typeValidationFactory = (fieldName: string, fieldType: FieldType): Validation => {
  return new TypeValidation(fieldName, fieldType)
}
