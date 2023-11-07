import { right, type Either } from '@/shared/either'
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
    Email.create(data.email)
    Password.create(data.password)
    return right(
      new User(nameOrError.value as unknown as Name)
    )
  }
}
