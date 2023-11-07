import { InvalidNameError } from '../../errors'
import { Name } from './name'

describe('Name ValueObject', () => {
  it('Should return InvalidNameError if length of name is less than 3 characters', () => {
    const sut = Name.create('ab')
    expect(sut.value).toEqual(new InvalidNameError('ab'))
  })

  it('Should return InvalidNameError if length of name is greater than 50 characters', () => {
    const name = 'a'.repeat(51)
    const sut = Name.create(name)
    expect(sut.value).toEqual(new InvalidNameError(name))
  })
})
