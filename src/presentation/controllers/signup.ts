import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http-protocols'
import type { EmailValidator } from '../protocols/email-validator'
import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-params-error'
import { InvalidParamError } from '../errors/invalid-params-error'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email } = httpRequest.body
      const isValid = this.emailValidator.validate(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
