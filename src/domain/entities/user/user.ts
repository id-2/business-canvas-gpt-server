import { right, type Either, left } from '@/shared/either'
import { Name } from './value-objects/name/name'
import { Email } from './value-objects/email/email'
import { Password } from './value-objects/password/password'
import type { UserDto } from './user-dto'

export class User {
  private constructor (private readonly name: Name) {
    Object.freeze(this)
  }

  static create (data: UserDto): Either<Error, User> {
    const nameOrError = Name.create(data.name)
    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    const emailOrError = Email.create(data.email)
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    const passwordOrError = Password.create(data.password)
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }
    return right(
      new User(nameOrError.value as unknown as Name)
    )
  }
}
