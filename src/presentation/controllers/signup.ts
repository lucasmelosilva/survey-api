import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http-protocols'
import type { EmailValidator } from '../protocols/email-validator'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-params'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email } = httpRequest.body
    this.emailValidator.validate(email)
  }
}
