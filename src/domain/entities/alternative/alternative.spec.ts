import { Alternative } from './alternative'
import { InvalidAlternativeError } from './errors/invalid-alternative-error'

describe('Alternative Entity', () => {
  it('Should return InvalidAlternativeError if description is less than 3 characters', () => {
    const sut = Alternative.create('ab')
    expect(sut.value).toEqual(new InvalidAlternativeError('ab'))
  })
})
