import { User } from './user'
import type { UserDto } from './user-dto'
import { Email } from './value-objects/email/email'
import { Name } from './value-objects/name/name'

const privateFactory = <T=any>(Cls: any, ...args: any[]): T => {
  return new Cls(...args)
}

const makeFakeUserDto = (): UserDto => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

describe('User Entity', () => {
  it('Should call Name with correct value', () => {
    const createSpy = jest.spyOn(Name, 'create')
    User.create(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith('any_name')
  })

  it('Should call Email with correct value', () => {
    const createSpy = jest.spyOn(Email, 'create')
    User.create(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
