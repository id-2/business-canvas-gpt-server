import type { AddUserRes, AddUser } from '@/domain/contracts'
import type { FetchUserByEmailRepo } from '../contracts/db'
import { User, type UserDto } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import { EmailInUseError } from '@/domain/errors'

export class AddUserUseCase implements AddUser {
  constructor (private readonly fetchUserByEmailRepo: FetchUserByEmailRepo) {}

  async perform (dto: UserDto): Promise<AddUserRes> {
    const userResult = User.create(dto)
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    const user = await this.fetchUserByEmailRepo.fetchByEmail(dto.email)
    if (user) {
      return left(new EmailInUseError(dto.email))
    }
    return right({ token: '' })
  }
}
