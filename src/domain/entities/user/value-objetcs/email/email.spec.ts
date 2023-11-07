import { InvalidEmailError } from '../../errors'
import { Email } from './email'

describe('Email ValueObject', () => {
  it('Should return InvalidEmailError if email is less than 9 characters', () => {
    const email = 'a'.repeat(8)
    const sut = Email.create(email)
    expect(sut.value).toEqual(new InvalidEmailError(email))
  })

  it('Should return InvalidEmailError if email without the at-sign', () => {
    const sut = Email.create('any_emailmail.com')
    expect(sut.value).toEqual(new InvalidEmailError('any_emailmail.com'))
  })

  it('Should return InvalidEmailError if email more than 64 characters on account part', () => {
    const accountPart = 'a'.repeat(65)
    const email = accountPart + '@mail.com'
    const sut = Email.create(email)
    expect(sut.value).toEqual(new InvalidEmailError(email))
  })

  it('Should return InvalidEmailError if email empty local part', () => {
    const sut = Email.create('@mail.com')
    expect(sut.value).toEqual(new InvalidEmailError('@mail.com'))
  })

  it('Should return InvalidEmailError if email invalid character in local part', () => {
    const sut = Email.create('any email@mail.com')
    expect(sut.value).toEqual(new InvalidEmailError('any email@mail.com'))
  })

  it('Should return InvalidEmailError if sending a dot as the first character of the email in the local part', () => {
    const sut = Email.create('.anyemail@mail.com')
    expect(sut.value).toEqual(new InvalidEmailError('.anyemail@mail.com'))
  })

  it('Should return InvalidEmailError if sending a dot as the last character of the email in the local part', () => {
    const sut = Email.create('anyemail.@mail.com')
    expect(sut.value).toEqual(new InvalidEmailError('anyemail.@mail.com'))
  })
})
