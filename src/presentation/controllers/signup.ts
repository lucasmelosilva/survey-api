import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http-protocols'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-params'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
