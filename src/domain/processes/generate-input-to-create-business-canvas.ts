import type { InputToCreateBusinessCanvas } from '../models/output-models'
import { TemplateForInputInPersonBusiness } from './input-templates'

export interface GenerateInputToCreateBusinessCanvasDto {
  typeOfBusiness: string
  businessDescription: string
  locationOrTargetAudience?: string
}

export class GenerateInputToCreateBusinessCanvas {
  static execute (dto: GenerateInputToCreateBusinessCanvasDto): InputToCreateBusinessCanvas {
    TemplateForInputInPersonBusiness.create()
    return { text: '' }
  }
}
