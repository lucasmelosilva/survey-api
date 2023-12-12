import type { Controller } from '../protocols/controller'
import type { HttpRequest, HttpResponse } from '../protocols/http-protocols'
import type { EmailValidator } from '../protocols/email-validator'
import type { AddAccount } from '../../domain/usecases/add-account'
import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-params-error'
import { InvalidParamError } from '../errors/invalid-params-error'
export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.validate(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({ name, email, password })
    } catch (error) {
      return serverError()
    }
  }
}
