import type { Auth, AuthDto, AuthRes } from '@/domain/contracts'
import { Email } from '@/domain/entities/user/value-objects'
import { left, right } from '@/shared/either'

export class AuthUseCase implements Auth {
  async perform (dto: AuthDto): Promise<AuthRes> {
    const emailResult = Email.create(dto.email)
    if (emailResult.isLeft()) {
      return left(emailResult.value)
    }
    return right({ token: '' })
  }
}
