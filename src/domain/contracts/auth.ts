import type { Either } from '@/shared/either'
import type { InvalidEmailError } from '../entities/user/errors'
import type { AccessTokenModel } from '../models/output-models'
import type { InvalidCreadentialsError } from '../errors'

export interface AuthDto {
  email: string
  password: string
}

export type AuthRes = Either<InvalidEmailError | InvalidCreadentialsError, AccessTokenModel>

export interface Auth {
  perform: (dto: AuthDto) => Promise<AuthRes>
}
