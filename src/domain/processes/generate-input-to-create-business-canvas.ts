import type { InputToCreateBusinessCanvas } from '../models/output-models'

export interface GenerateInputToCreateBusinessCanvasDto {
  typeOfBusiness: string
  businessDescription: string
  locationOrTargetAudience?: string
}

export class GenerateInputToCreateBusinessCanvas {
  static execute (dto: GenerateInputToCreateBusinessCanvasDto): InputToCreateBusinessCanvas {
    return { text: '' }
  }
}
