import type { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import type { HashComparer } from '../../protocols/cryptography/hash-comparer'
import type { TokenGenerator } from '../../protocols/cryptography/token-generator'
import type { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import type { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update({
          id: account.id,
          accessToken
        })
        return accessToken
      }
    }
    return null
  }
}
