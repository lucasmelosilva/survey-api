import type { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import type { HashComparer } from '../../protocols/cryptography/hash-comparer'
import type { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
