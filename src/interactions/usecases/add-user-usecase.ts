import type { AddUserRes, AddUser } from '@/domain/contracts/add-user'
import { User, type UserDto } from '@/domain/entities/user'
import { right } from '@/shared/either'

export class AddUserUseCase implements AddUser {
  async perform (dto: UserDto): Promise<AddUserRes> {
    User.create(dto)
    return right({ token: '' })
  }
}
