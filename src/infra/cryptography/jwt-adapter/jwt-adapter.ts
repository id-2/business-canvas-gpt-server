import type { Decrypter, Encrypter, EncrypterDto } from '@/interactions/contracts/cryptography'
import type { AccessTokenModel } from '@/domain/models/output-models'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (data: EncrypterDto): Promise<AccessTokenModel> {
    let expiresIn: string | undefined
    if (data.expiresInHours && data.expiresInHours > 0) {
      expiresIn = data.expiresInHours.toString() + 'h'
    }
    const token = jwt.sign({ value: data.value }, this.secretKey, { expiresIn })
    return { token }
  }

  async decrypt (token: string): Promise<null | string> {
    jwt.verify(token, this.secretKey)
    return null
  }
}
