import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  it('should return a InvalidParamsError if validate fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'another_value' })
    expect(error).toBeInstanceOf(InvalidParamError)
  })
})
