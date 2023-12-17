import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    const route = '/test_cors'
    app.get(route, (req, res) => {
      res.send()
    })
    await request(app)
      .get(route)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
