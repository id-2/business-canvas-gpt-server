import { TemplateForInputWithLocation as sut } from './template-for-input-with-location'

describe('TemplateForInputWithLocation', () => {
  it('Should return a TemplateInputModel', async () => {
    const result = sut.create()
    expect(result.input).toBeTruthy()
    expect(typeof result.input).toBe('string')
  })
})
