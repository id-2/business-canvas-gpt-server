import type { BusinessCanvasApiModel } from '@/domain/models/output-models'
import type { CreateBusinessCanvasApiDto, CreateBusinessCanvasApi } from '@/interactions/contracts/api'
import OpenAI from 'openai'
import env from '@/main/configs/env'

export class BusinessCanvasOpenAiApi implements CreateBusinessCanvasApi {
  async create (dto: CreateBusinessCanvasApiDto): Promise<BusinessCanvasApiModel> {
    const openAi = new OpenAI({ apiKey: env.openAiApiKey })
    const valeu = '' as any
    return valeu
  }
}
