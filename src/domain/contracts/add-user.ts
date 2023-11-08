import type { Either } from '@/shared/either'
import type { UserDto } from '../entities/user'
import type { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../entities/user/errors'
import type { AccessToken } from '../models/output-models'
import type { EmailInUseError } from '../errors'

export type AddUserRes = Either<
InvalidNameError | InvalidEmailError | InvalidPasswordError | EmailInUseError, AccessToken
>

export interface AddUser {
  perform: (dto: UserDto) => Promise<AddUserRes>
}
