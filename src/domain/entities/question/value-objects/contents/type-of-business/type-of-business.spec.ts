import { TypeOfBusiness } from './type-of-business'

describe('TypeOfBusiness ValueObject', () => {
  it('Should create TypeOfBusiness', () => {
    const sut = TypeOfBusiness.getContent()
    expect(sut).toBe('Qual o tipo do seu negócio?')
  })
})
