import { TemplateForInputInPersonBusiness as sut } from './template-for-input-in-person-business'

describe('TemplateForInputWithLocation', () => {
  it('Should return a TemplateInputModel', async () => {
    const result = sut.create()
    expect(result.input).toBeTruthy()
    expect(typeof result.input).toBe('string')
  })
})
