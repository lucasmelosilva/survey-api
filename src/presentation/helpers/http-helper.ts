import type { HttpResponse } from '../protocols/http-protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
