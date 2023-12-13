import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBeFalsy()
  })

  it('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.validate('valid_email@mail.com')
    expect(isValid).toBeTruthy()
  })
})
