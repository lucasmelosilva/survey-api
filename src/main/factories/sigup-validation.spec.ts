import type { Validation } from '../../presentation/helpers/validators/validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation-factory'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation factory', () => {
  it('should call ValidationComposite with all validations', () => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    makeSignUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
