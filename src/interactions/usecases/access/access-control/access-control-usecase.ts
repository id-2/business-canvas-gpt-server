import type { AccessControl, AccessControlDto, AccessControlRes } from '@/domain/contracts'
import type { LoadUserByIdRepo } from '@/interactions/contracts/db/load-user-by-id-repo'
import type { Decrypter } from '@/interactions/contracts/cryptography'
import { InvalidTokenError } from '@/domain/errors'
import { left, right } from '@/shared/either'

export class AccessControlUseCase implements AccessControl {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserById: LoadUserByIdRepo
  ) {}

  async perform (dto: AccessControlDto): Promise<AccessControlRes> {
    const id = await this.decrypter.decrypt(dto.accessToken)
    if (!id) {
      return left(new InvalidTokenError())
    }
    await this.loadUserById.loadById(id)
    return right({ userId: '' })
  }
}
