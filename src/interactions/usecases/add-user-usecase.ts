import type { AddUserRes, AddUser, AccessTokenBuilder } from '@/domain/contracts'
import type { FetchUserByEmailRepo } from '../contracts/db'
import type { Hasher } from '../contracts/cryptography'
import type { IdBuilder } from '../contracts/id/id-builder'
import { User, type UserDto } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import { EmailInUseError } from '@/domain/errors'

export class AddUserUseCase implements AddUser {
  constructor (
    private readonly fetchUserByEmailRepo: FetchUserByEmailRepo,
    private readonly hasher: Hasher,
    private readonly idBuilder: IdBuilder,
    private readonly accessTokenBuilder: AccessTokenBuilder
  ) {}

  async perform (dto: UserDto): Promise<AddUserRes> {
    const userResult = User.create(dto)
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    const user = await this.fetchUserByEmailRepo.fetchByEmail(dto.email)
    if (user) {
      return left(new EmailInUseError(dto.email))
    }
    await this.hasher.hashing(dto.password)
    const { id } = this.idBuilder.build()
    await this.accessTokenBuilder.perform(id)
    return right({ token: '' })
  }
}
