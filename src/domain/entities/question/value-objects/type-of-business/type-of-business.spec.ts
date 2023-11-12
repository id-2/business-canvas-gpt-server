import { TypeOfBusiness } from './type-of-business'

describe('TypeOfBusiness ValueObject', () => {
  it('Should create TypeOfBusiness', () => {
    const sut = TypeOfBusiness.create()
    expect(sut).toEqual({ content: 'Qual o tipo do seu negócio?' })
  })
})
