import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { AccountModel } from '../../../../domain/models/account-model'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await MongoHelper.insertAndFind(accountData, 'accounts')
    return MongoHelper.map(account)
  }
}
