import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  },

  async compare (data: string, hash: string): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const makeSut = (salt = 12): BcryptAdapter => (new BcryptAdapter(salt))

describe('Bcrypt Adapter', () => {
  it('should call hash with correct values', async () => {
    const salt = 10
    const sut = makeSut(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hashedValue = await sut.hash('any_value')
    expect(hashedValue).toEqual('hashed_value')
  })

  it('should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => (await new Promise((resolve, reject) => reject(new Error()))))
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  it('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash')
  })

  it('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash')
    expect(isValid).toBe(true)
  })

  it('should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async (): Promise<boolean> => (await new Promise(resolve => resolve(false))))
    const isValid = await sut.compare('any_value', 'hash')
    expect(isValid).toBe(false)
  })

  it('should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => (await new Promise((resolve, reject) => reject(new Error()))))
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
