import { right, type Either } from '@/shared/either'
import { Name } from './value-objects/name/name'
import { Email } from './value-objects/email/email'

export class User {
  private constructor (private readonly name: Name) {
    Object.freeze(this)
  }

  static create (data: { name: string, email: string }): Either<Error, User> {
    const nameOrError = Name.create(data.name)
    const emailOrError = Email.create(data.email)
    return right(
      new User(nameOrError.value as unknown as Name)
    )
  }
}
