import { BusinessDescription } from './business-description'

describe('BusinessDescription ValueObject', () => {
  it('Should create BusinessDescription', () => {
    const sut = BusinessDescription.getContent()
    expect(sut).toBe('Descreva seu negócio:')
  })
})
