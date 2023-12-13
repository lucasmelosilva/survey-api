import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBeFalsy()
  })
})
