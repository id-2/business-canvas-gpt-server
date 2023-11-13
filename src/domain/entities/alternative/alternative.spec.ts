import { Alternative } from './alternative'

describe('Alternative Entity', () => {
  it('Should return new Alternative', () => {
    const sut = Alternative.create('any_description')
    expect(sut).toEqual({ description: 'any_description' })
  })
})
