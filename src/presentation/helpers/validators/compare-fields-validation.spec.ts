import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => (
  new CompareFieldsValidation('field', 'fieldToCompare')
)

describe('CompareFields Validation', () => {
  it('should return a InvalidParamsError if validate fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'another_value' })
    expect(error).toBeInstanceOf(InvalidParamError)
  })

  it('should not return if validate succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
