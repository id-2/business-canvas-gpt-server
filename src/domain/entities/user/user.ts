import { right, type Either, left } from '@/shared/either'
import { Name, Email, Password } from './value-objects'
import type { UserDto } from './user-dto'

export class User {
  private constructor (
    private readonly name: Name,
    private readonly email: Email,
    private readonly password: Password
  ) {
    Object.freeze(this)
  }

  static create (data: UserDto): Either<Error, User> {
    const nameOrError = Name.create(data.name)
    const emailOrError = Email.create(data.email)
    const passwordOrError = Password.create(data.password)
    const results = [nameOrError, emailOrError, passwordOrError]
    for (const result of results) {
      if (result.isLeft()) {
        return left(result.value)
      }
    }
    return right(
      new User(
        nameOrError.value as Name,
        emailOrError.value as Email,
        passwordOrError.value as Password
      )
    )
  }
}
