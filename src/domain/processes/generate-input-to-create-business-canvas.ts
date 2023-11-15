import type { InputToCreateBusinessCanvas } from '../models/output-models'
import { TemplateForInputInPersonBusiness, TemplateForInputOnlineBusiness } from './input-templates'

export interface GenerateInputToCreateBusinessCanvasDto {
  typeOfBusiness: string
  businessDescription: string
  locationOrTargetAudience?: string
}

export class GenerateInputToCreateBusinessCanvas {
  static execute (dto: GenerateInputToCreateBusinessCanvasDto): InputToCreateBusinessCanvas {
    if (dto.locationOrTargetAudience) {
      TemplateForInputInPersonBusiness.create()
      return { text: '' }
    }
    TemplateForInputOnlineBusiness.create()
    return { text: '' }
  }
}
