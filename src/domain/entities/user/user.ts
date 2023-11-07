import { right, type Either } from '@/shared/either'
import { Name } from './value-objects/name/name'

export class User {
  private constructor (private readonly name: Name) {}

  static create (data: { name: string }): Either<Error, User> {
    const nameOrError = Name.create(data.name)
    return right(
      new User(nameOrError.value as unknown as Name)
    )
  }
}
