import { Alternative } from './alternative'
import { InvalidAlternativeError } from './errors/invalid-alternative-error'

describe('Alternative Entity', () => {
  it('Should return InvalidAlternativeError if description is less than 3 characters', () => {
    const sut = Alternative.create('ab')
    expect(sut.value).toEqual(new InvalidAlternativeError('ab'))
  })

  it('Should return InvalidAlternativeError if description greater than 100 characters', () => {
    const description = 'a'.repeat(101)
    const sut = Alternative.create(description)
    expect(sut.value).toEqual(new InvalidAlternativeError(description))
  })

  it('Should return new Alternative if is valid description', () => {
    const sut = Alternative.create('any_description')
    expect(sut.value).toEqual({ description: 'any_description' })
  })
})
