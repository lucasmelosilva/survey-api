import { MongoClient } from 'mongodb'
import type { Collection } from 'mongodb'
import type { AccountModel } from '../../../../domain/models/account-model'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },

  async insertAndFind (data: any, name: string): Promise<any> {
    const collection = await this.getCollection(name)
    const { insertedId } = await collection.insertOne(data)
    const result = await collection.findOne({ _id: insertedId })
    return result
  },

  map (collection: any): AccountModel {
    const { _id, ...accountWithoutId } = collection
    return { id: _id.toString(), ...accountWithoutId }
  }
}
