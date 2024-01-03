import type { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

let accountsCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  describe('add()', () => {
    it('should return an account on add success', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    it('should return an account on loadByEmail success', async () => {
      const { insertedId } = await accountsCollection.insertOne({
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        password: 'any_password'
      })

      const sut = new AccountMongoRepository()
      const account = await sut.loadByEmail('john_doe@gmail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.id).toEqual(insertedId.toString())
      expect(account.name).toBe('John Doe')
      expect(account.email).toBe('john_doe@gmail.com')
      expect(account.password).toBe('any_password')
    })

    it('should return an account on loadByEmail success', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.loadByEmail('john_doe@gmail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update the account accessToken on updateAccessToken success', async () => {
      const { insertedId } = await accountsCollection.insertOne({
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        password: 'any_password'
      })
      const sut = new AccountMongoRepository()
      const accountBeforeUpdate = await accountsCollection.findOne({ _id: insertedId })
      expect(accountBeforeUpdate.accessToken).toBeFalsy()
      await sut.updateAccessToken({
        id: insertedId.toString(),
        accessToken: 'any_token'
      })
      const accountAfterUpdate = await accountsCollection.findOne({ _id: insertedId })
      expect(accountAfterUpdate.accessToken).toBeTruthy()
      expect(accountAfterUpdate.accessToken).toEqual('any_token')
    })
  })
})
