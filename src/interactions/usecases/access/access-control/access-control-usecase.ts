import type { AccessControl, AccessControlDto, AccessControlRes } from '@/domain/contracts'
import type { Decrypter } from '@/interactions/contracts/cryptography'
import { right } from '@/shared/either'

export class AccessControlUseCase implements AccessControl {
  constructor (private readonly decrypter: Decrypter) {}

  async perform (dto: AccessControlDto): Promise<AccessControlRes> {
    await this.decrypter.decrypt(dto.accessToken)

    return right({ userId: '' })
  }
}
