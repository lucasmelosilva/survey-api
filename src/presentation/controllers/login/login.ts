import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
    return await new Promise(resolve => resolve(null))
  }
}
