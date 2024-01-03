import { ObjectId } from 'mongodb'
import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import type { UpdateAccessTokenRepository, UpdateModel } from '../../../../data/protocols/db/update-access-token-repository'
import type { AccountModel } from '../../../../domain/models/account-model'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await MongoHelper.insertAndFind(accountData, 'accounts')
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    const account = await accountsCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (updateMode: UpdateModel): Promise<void> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.updateOne({
      _id: new ObjectId(updateMode.id)
    }, {
      $set: {
        accessToken: updateMode.accessToken
      }
    })
  }
}
