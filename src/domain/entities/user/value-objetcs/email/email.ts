import { type Either, left, right } from '../../../../../shared/either'
import { InvalidEmailError } from '../../errors'

export class Email {
  private constructor (private readonly email: string) {
    Object.freeze(this)
  }

  static create (email: string): Either<InvalidEmailError, Email> {
    if (!this.validate(email)) {
      return left(new InvalidEmailError(email))
    }
    return right(new Email(email))
  }

  private static validate (email: string): boolean {
    if (email.length < 9) {
      return false
    }
    return true
  }
}
