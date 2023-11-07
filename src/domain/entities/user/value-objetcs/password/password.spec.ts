import { InvalidPasswordError } from '../../errors'
import { Password } from './password'

describe('Password ValueObject', () => {
  it('Should return InvalidPasswordError if password is less than 8 characters', () => {
    const password = 'a'.repeat(7)
    const sut = Password.create(password)
    expect(sut.value).toEqual(new InvalidPasswordError(password))
  })
})
