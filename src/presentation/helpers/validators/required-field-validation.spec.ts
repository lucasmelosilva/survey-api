import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => (
  new RequiredFieldValidation('field')
)

describe('RequiredField Validation', () => {
  it('should return a MissingParamsError if validate fails', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toBeInstanceOf(MissingParamError)
  })

  it('should not return if validate succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
