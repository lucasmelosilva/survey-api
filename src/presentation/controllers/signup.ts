import type { HttpRequest, HttpResponse } from '../protocols/http-protocols'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`Missing param: ${field}`))
      }
    }
  }
}
