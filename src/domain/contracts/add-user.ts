import type { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../entities/user/errors'
import type { Either } from '@/shared/either'
import type { EmailInUseError } from '../errors'
import type { RoleName } from '../models/db-models'
import type { AccessTokenModel } from '../models/output-models'
import type { UserDto } from '../entities/user'

export interface AddUserDto extends UserDto {
  roleName: RoleName
}

export type AddUserRes = Either<
InvalidNameError | InvalidEmailError | InvalidPasswordError | EmailInUseError, AccessTokenModel
>

export interface AddUser {
  perform: (dto: AddUserDto) => Promise<AddUserRes>
}
