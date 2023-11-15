import type { AddRandomUser } from '@/domain/contracts'
import type { Hasher } from '../../../contracts/cryptography'
import type { IdModel } from '@/domain/models/output-models'
import env from '@/main/configs/env'

export class AddRandomUserUseCase implements AddRandomUser {
  constructor (private readonly hasher: Hasher) {}

  async perform (): Promise<IdModel> {
    await this.hasher.hashing(env.randomUserPassword)
    return { id: '' }
  }
}
