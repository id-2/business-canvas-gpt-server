import { BusinessDescription } from './business-description'

describe('BusinessDescription ValueObject', () => {
  it('Should create BusinessDescription', () => {
    const sut = BusinessDescription.create()
    expect(sut).toEqual({ content: 'Descreva seu negócio:' })
  })
})
