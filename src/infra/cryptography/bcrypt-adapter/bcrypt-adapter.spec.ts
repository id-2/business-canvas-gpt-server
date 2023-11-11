import type { ComparerDto } from '@/interactions/contracts/cryptography'
import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

const makeHashComparerData = (): ComparerDto => ({
  value: 'any_value',
  hash: 'any_hash'
})

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },

  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))
const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hashing('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('Should throw if bcrypt throws', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash') as unknown as jest.Mock<
      ReturnType<(key: Error) => Promise<Error>>,
      Parameters<(key: Error) => Promise<Error>>
      >
      hashSpy.mockReturnValueOnce(
        Promise.reject(new Error())
      )
      const promise = sut.hashing('any_value')
      await expect(promise).rejects.toThrow()
    })

    it('Should return a valid hash if hash is a success', async () => {
      const sut = makeSut()
      const result = await sut.hashing('any_value')
      expect(result).toEqual({ hash: 'hash' })
    })
  })

  describe('compare()', () => {
    it('Should call bcrypt compare with correct values', async () => {
      const sut = makeSut()
      const comparerSpy = jest.spyOn(bcrypt, 'compare')
      await sut.comparer(makeHashComparerData())
      expect(comparerSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
  })
})
