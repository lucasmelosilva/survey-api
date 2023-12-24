import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return await new Promise(resolve => resolve(null))
  }
}