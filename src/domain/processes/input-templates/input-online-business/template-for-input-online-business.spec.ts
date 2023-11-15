import { TemplateForInputOnlineBusiness as sut } from './template-for-input-online-business'

describe('TemplateForInputOnlineBusiness', () => {
  it('Should return a TemplateInputModel', async () => {
    const result = sut.create()
    expect(result.input).toBeTruthy()
    expect(typeof result.input).toBe('string')
  })
})
