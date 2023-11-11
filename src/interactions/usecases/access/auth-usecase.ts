import type { Auth, AuthDto, AuthRes } from '@/domain/contracts'
import type { FetchUserByEmailRepo } from '@/interactions/contracts/db'
import { InvalidCredentialsError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { Email } from '@/domain/entities/user/value-objects'

export class AuthUseCase implements Auth {
  constructor (private readonly fetchUserByEmailRepo: FetchUserByEmailRepo) {}

  async perform (dto: AuthDto): Promise<AuthRes> {
    const emailResult = Email.create(dto.email)
    if (emailResult.isLeft()) {
      return left(emailResult.value)
    }
    const user = await this.fetchUserByEmailRepo.fetchByEmail(dto.email)
    if (!user) {
      return left(new InvalidCredentialsError())
    }
    return right({ token: '' })
  }
}
