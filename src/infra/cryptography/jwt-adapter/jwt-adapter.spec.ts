import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

const expiresIn = undefined

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('any_secret')
}

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ value: 'any_id', expiresInHours: 48 })
    expect(signSpy).toHaveBeenCalledWith(
      { id: 'any_id' }, 'any_secret', { expiresIn: '48h' }
    )
  })

  it('Should call sign without expires in hours', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ value: 'any_id' })
    expect(signSpy).toHaveBeenCalledWith(
      { id: 'any_id' }, 'any_secret', { expiresIn }
    )
  })
})
