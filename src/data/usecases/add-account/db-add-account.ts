import type { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashed = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add({
      ...account,
      password: hashed
    })
    return await new Promise(resolve => resolve(null))
  }
}
