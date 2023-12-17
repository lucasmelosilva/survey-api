import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    const route = '/api/signup'
    await request(app)
      .post(route)
      .send({
        name: 'John Doe',
        email: 'john_doe@mail',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
