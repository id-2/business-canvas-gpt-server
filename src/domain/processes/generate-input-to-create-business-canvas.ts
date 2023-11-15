import type { InputToCreateBusinessCanvas } from '../models/output-models'
import { TemplateForInputWithLocation } from './input-templates/input-with-location/template-for-input-with-location'

export interface GenerateInputToCreateBusinessCanvasDto {
  typeOfBusiness: string
  businessDescription: string
  locationOrTargetAudience?: string
}

export class GenerateInputToCreateBusinessCanvas {
  static execute (dto: GenerateInputToCreateBusinessCanvasDto): InputToCreateBusinessCanvas {
    TemplateForInputWithLocation.create()
    return { text: '' }
  }
}
