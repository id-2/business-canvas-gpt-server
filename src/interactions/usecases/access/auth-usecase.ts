import type { Auth, AuthDto, AuthRes } from '@/domain/contracts'
import { Email } from '@/domain/entities/user/value-objects'
import { right } from '@/shared/either'

export class AuthUseCase implements Auth {
  async perform (dto: AuthDto): Promise<AuthRes> {
    Email.create(dto.email)
    return right({ token: '' })
  }
}
