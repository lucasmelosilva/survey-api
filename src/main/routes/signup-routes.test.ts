import request from 'supertest'
import type { Collection } from 'mongodb'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      const route = '/api/signup'
      await request(app)
        .post(route)
        .send({
          name: 'John Doe',
          email: 'john_doe@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const route = '/api/login'
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        password
      })
      await request(app)
        .post(route)
        .send({
          email: 'john_doe@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    it('should return 401 on login', async () => {
      const route = '/api/login'
      await request(app)
        .post(route)
        .send({
          email: 'john_doe@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
