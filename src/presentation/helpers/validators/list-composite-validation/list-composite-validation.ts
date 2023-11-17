import { type Validation } from '@/presentation/contracts'
import { right, type Either } from '@/shared/either'

export class ListCompositeValidation implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): Either<Error, null> {
    for (const validation of this.validations) {
      const array = input as any[]
      for (const fields of array) {
        validation.validate(fields)
      }
    }
    return right(null)
  }
}
