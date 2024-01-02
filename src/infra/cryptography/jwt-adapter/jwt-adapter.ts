import type { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (id: string): Promise<string> {
    const token = jwt.sign({ id }, this.secret)
    return token
  }
}
