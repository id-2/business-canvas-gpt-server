import { BusinessCanvasOpenAiApi } from './business-canvas-open-ai-api'
import OpenAI from 'openai'

jest.mock('openai')

describe('BusinessCanvasOpenAi Api', () => {
  it('Should call OpenAI with correct key', async () => {
    const sut = new BusinessCanvasOpenAiApi()
    await sut.create({ input: 'any_input' })
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: 'any_key' })
  })
})
