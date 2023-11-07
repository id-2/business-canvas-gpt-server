import { InvalidNameError } from '../../errors'
import { Name } from './name'

describe('Name ValueObject', () => {
  it('Should return InvalidNameError if length of name is less than 3 characters', () => {
    const sut = Name.create('ab')
    expect(sut.value).toEqual(new InvalidNameError('ab'))
  })
})
