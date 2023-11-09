import type { Encrypter, EncrypterDto } from '@/interactions/contracts/cryptography'
import type { AccessTokenModel } from '@/domain/models/output-models'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (data: EncrypterDto): Promise<AccessTokenModel> {
    let expiresIn: string | undefined
    if (data.expiresInHours) {
      expiresIn = data.expiresInHours.toString() + 'h'
    }
    jwt.sign({ id: data.value }, this.secretKey, { expiresIn })
    return { token: '' }
  }
}
