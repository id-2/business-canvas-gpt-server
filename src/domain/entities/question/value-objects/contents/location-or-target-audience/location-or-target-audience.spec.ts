import { LocationOrTargetAudience } from './location-or-target-audience'

describe('LocationOrTargetAudience ValueObject', () => {
  it('Should create LocationOrTargetAudience', async () => {
    const sut = LocationOrTargetAudience.getContent()
    expect(sut).toBe(
      'Qual a localização ou público para o qual deseja trabalhar (Cidade, estado ou país)?'
    )
  })
})
