import { MongoClient } from 'mongodb'
import type { Collection } from 'mongodb'
import type { AccountModel } from '../../../../domain/models/account-model'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async insertAndFind (data: any, name: string): Promise<any> {
    const collection = this.getCollection(name)
    const { insertedId } = await collection.insertOne(data)
    const result = await collection.findOne({ _id: insertedId })
    return result
  },

  map (collection: any): AccountModel {
    const { _id, ...accountWithoutId } = collection
    return { id: _id.toString(), ...accountWithoutId }
  }
}
