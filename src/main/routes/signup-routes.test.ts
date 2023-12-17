import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
