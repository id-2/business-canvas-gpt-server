import type { Auth, AuthDto, AuthRes } from '@/domain/contracts'
import type { FetchUserByEmailRepo } from '@/interactions/contracts/db'
import { Email } from '@/domain/entities/user/value-objects'
import { left, right } from '@/shared/either'

export class AuthUseCase implements Auth {
  constructor (private readonly fetchUserByEmailRepo: FetchUserByEmailRepo) {}

  async perform (dto: AuthDto): Promise<AuthRes> {
    const emailResult = Email.create(dto.email)
    if (emailResult.isLeft()) {
      return left(emailResult.value)
    }
    await this.fetchUserByEmailRepo.fetchByEmail(dto.email)
    return right({ token: '' })
  }
}
