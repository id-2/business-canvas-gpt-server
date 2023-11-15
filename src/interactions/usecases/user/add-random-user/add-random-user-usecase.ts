import type { AddRandomUser } from '@/domain/contracts'
import type { Hasher } from '../../../contracts/cryptography'
import type { IdModel } from '@/domain/models/output-models'
import type { IdBuilder } from '@/interactions/contracts/id/id-builder'
import env from '@/main/configs/env'

export class AddRandomUserUseCase implements AddRandomUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (): Promise<IdModel> {
    await this.hasher.hashing(env.randomUserPassword)
    this.idBuilder.build()
    return { id: '' }
  }
}
