import type { Validation } from './validation'
import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validations: Validation[]
}

const makeSut = (): SutTypes => {
  const validations = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validations)
  return {
    sut,
    validations
  }
}

describe('Validation Composite', () => {
  it('should return an error if any validate fails', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
