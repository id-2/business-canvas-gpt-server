import type { InputToCreateBusinessCanvas } from '@/domain/models/output-models'

export interface GenerateInputToCreateBusinessCanvasDto {
  typeOfBusiness: string
  businessDescription: string
  locationOrTargetAudience?: string
}

export interface GenerateInputToCreateBusinessCanvas {
  perform: (dto: GenerateInputToCreateBusinessCanvasDto) => Promise<InputToCreateBusinessCanvas>
}
