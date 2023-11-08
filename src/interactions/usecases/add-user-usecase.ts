import type { AddUserRes, AddUser } from '@/domain/contracts'
import type { FetchUserByEmailRepo } from '../contracts/db'
import { User, type UserDto } from '@/domain/entities/user'
import { left, right } from '@/shared/either'

export class AddUserUseCase implements AddUser {
  constructor (private readonly fetchUserByEmailRepo: FetchUserByEmailRepo) {}

  async perform (dto: UserDto): Promise<AddUserRes> {
    const userResult = User.create(dto)
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    await this.fetchUserByEmailRepo.fetchByEmail(dto.email)
    return right({ token: '' })
  }
}
