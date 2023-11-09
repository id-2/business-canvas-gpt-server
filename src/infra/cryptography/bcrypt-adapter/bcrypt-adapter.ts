import type { HashedModel } from '@/domain/models/output-models'
import type { Hasher } from '@/interactions/contracts/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hashing (value: string): Promise<HashedModel> {
    const hash = await bcrypt.hash(value, this.salt)
    return { hash }
  }
}
