import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return 'any_value'
  }
}))

const expiresIn = undefined

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('any_secret')
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ value: 'any_value', expiresInHours: 48 })
      expect(signSpy).toHaveBeenCalledWith(
        { value: 'any_value' }, 'any_secret', { expiresIn: '48h' }
      )
    })

    it('Should call sign without expires in hours', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ value: 'any_value' })
      expect(signSpy).toHaveBeenCalledWith(
        { value: 'any_value' }, 'any_secret', { expiresIn }
      )
    })

    it('Should call sign with expiresIn undefined if expires in hours is equal 0', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ value: 'any_value', expiresInHours: 0 })
      expect(signSpy).toHaveBeenCalledWith({ value: 'any_value' }, 'any_secret', { expiresIn })
    })

    it('Should call sign with expiresIn undefined if expires in hours is less than 0', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt({ value: 'any_value', expiresInHours: -1 })
      expect(signSpy).toHaveBeenCalledWith({ value: 'any_value' }, 'any_secret', { expiresIn })
    })

    it('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt({ value: 'any_value' })
      await expect(promise).rejects.toThrow()
    })

    it('Should return AccessTokenModel if sign is a success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt({ value: 'any_id' })
      expect(accessToken).toEqual({ token: 'any_token' })
    })
  })

  describe('decrypt()', () => {
    it('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'any_secret')
    })
  })
})
