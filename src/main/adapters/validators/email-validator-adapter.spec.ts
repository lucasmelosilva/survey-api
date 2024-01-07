import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBeFalsy()
  })

  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.validate('valid_email@mail.com')
    expect(isValid).toBeTruthy()
  })

  it('should call validator with correct value', () => {
    const sut = makeSut()
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.validate('valid_email@mail.com')
    expect(isEmail).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
