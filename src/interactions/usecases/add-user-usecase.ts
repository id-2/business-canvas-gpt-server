import type { AccessTokenBuilder, AddUser, AddUserDto, AddUserRes } from '@/domain/contracts'
import type { AddUserRepo, FetchUserByEmailRepo } from '../contracts/db'
import type { Hasher } from '../contracts/cryptography'
import type { IdBuilder } from '../contracts/id/id-builder'
import { User } from '@/domain/entities/user'
import { EmailInUseError } from '@/domain/errors'
import { left, right } from '@/shared/either'

export class AddUserUseCase implements AddUser {
  constructor (
    private readonly fetchUserByEmailRepo: FetchUserByEmailRepo,
    private readonly hasher: Hasher,
    private readonly idBuilder: IdBuilder,
    private readonly accessTokenBuilder: AccessTokenBuilder,
    private readonly addUserRepo: AddUserRepo
  ) {}

  async perform (dto: AddUserDto): Promise<AddUserRes> {
    const { email, name, password, roleName } = dto
    const userResult = User.create({ email, name, password })
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    const user = await this.fetchUserByEmailRepo.fetchByEmail(email)
    if (user) {
      return left(new EmailInUseError(email))
    }
    const { hash } = await this.hasher.hashing(dto.password)
    const { id } = this.idBuilder.build()
    await this.accessTokenBuilder.perform(id)
    await this.addUserRepo.add({
      id, name, email, password: hash, roleName, createdAt: new Date()
    })
    return right({ token: '' })
  }
}
