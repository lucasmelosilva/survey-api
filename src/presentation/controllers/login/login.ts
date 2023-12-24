import type { EmailValidator } from '../signup/signup-protocols'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
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
    return await new Promise(resolve => resolve(null))
  }
}
