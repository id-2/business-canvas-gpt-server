import type { BusinessCanvasOutputModel } from '@/domain/models/output-models'

export interface AddBusinessCanvasDto {
  userId: string
  businessCanvasData: BusinessCanvasOutputModel
}

export interface AddBusinessCanvas {
  perform: (dto: AddBusinessCanvasDto) => Promise<void>
}
