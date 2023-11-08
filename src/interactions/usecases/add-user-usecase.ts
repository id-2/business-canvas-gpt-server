import type { AddUserRes, AddUser } from '@/domain/contracts/add-user'
import { User, type UserDto } from '@/domain/entities/user'
import { left, right } from '@/shared/either'

export class AddUserUseCase implements AddUser {
  async perform (dto: UserDto): Promise<AddUserRes> {
    const userResult = User.create(dto)
    if (userResult.isLeft()) {
      return left(userResult.value)
    }
    return right({ token: '' })
  }
}
