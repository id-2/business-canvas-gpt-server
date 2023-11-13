import { left, type Either, right } from '@/shared/either'
import { InvalidAlternativeError } from './errors/invalid-alternative-error'

export class Alternative {
  private constructor (private readonly description: string) {
    Object.freeze(this)
  }

  static create (description: string): Either<InvalidAlternativeError, Alternative> {
    if (!this.validate(description)) {
      return left(new InvalidAlternativeError(description))
    }
    return right(new Alternative(description))
  }

  private static validate (description: string): boolean {
    if (description.length < 3 || description.length > 100) {
      return false
    }
    return true
  }
}
