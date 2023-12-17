import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  it('should parser body as json', async () => {
    const route = '/test_body_parser'
    app.post(route, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(route)
      .send({ name: 'John Doe' })
      .expect({ name: 'John Doe' })
  })
})
