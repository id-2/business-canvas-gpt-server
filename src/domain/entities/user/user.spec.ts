import { left, right } from '@/shared/either'
import { User } from './user'
import type { UserDto } from './user-dto'
import { Email } from './value-objects/email/email'
import { Name } from './value-objects/name/name'
import { Password } from './value-objects/password/password'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from './errors'

const privateFactory = <T=any>(Cls: any, ...args: any[]): T => {
  return new Cls(...args)
}

const makeFakeUserDto = (): UserDto => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

describe('User Entity', () => {
  beforeAll(() => {
    const fakeName = privateFactory<Name>(Name, 'any_name')
    const fakeEmail = privateFactory<Email>(Email, 'any_email@mail.com')
    const fakePassword = privateFactory<Password>(Password, 'any_password')
    jest.spyOn(Name, 'create').mockReturnValue(right(fakeName))
    jest.spyOn(Email, 'create').mockReturnValue(right(fakeEmail))
    jest.spyOn(Password, 'create').mockReturnValue(right(fakePassword))
  })

  it('Should call Name with correct value', () => {
    const createSpy = jest.spyOn(Name, 'create')
    User.create(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith('any_name')
  })

  it('Should return InvalidNameError if Name return InvalidNameError', () => {
    jest.spyOn(Name, 'create').mockReturnValueOnce(
      left(new InvalidNameError('any_name'))
    )
    const sut = User.create(makeFakeUserDto())
    expect(sut.value).toEqual(new InvalidNameError('any_name'))
  })

  it('Should call Email with correct value', () => {
    const createSpy = jest.spyOn(Email, 'create')
    User.create(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should return InvalidEmailError if Email return InvalidEmailError', () => {
    jest.spyOn(Email, 'create').mockReturnValueOnce(
      left(new InvalidEmailError('any_email@mail.com'))
    )
    const sut = User.create(makeFakeUserDto())
    expect(sut.value).toEqual(new InvalidEmailError('any_email@mail.com'))
  })

  it('Should call Password with correct value', () => {
    const createSpy = jest.spyOn(Password, 'create')
    User.create(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should return InvalidPasswordError if Password return InvalidPasswordError', () => {
    jest.spyOn(Password, 'create').mockReturnValueOnce(
      left(new InvalidPasswordError('any_password'))
    )
    const sut = User.create(makeFakeUserDto())
    expect(sut.value).toEqual(new InvalidPasswordError('any_password'))
  })
})
