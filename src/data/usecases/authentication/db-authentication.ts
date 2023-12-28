import type { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import type { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return await new Promise<string>(resolve => resolve(null))
  }
}
