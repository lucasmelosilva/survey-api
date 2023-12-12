import type { AccountModel } from '../models/account-model'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
