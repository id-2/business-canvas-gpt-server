import type { TemplateInputModel } from '@/domain/models/output-models'

export class TemplateForInputWithLocation {
  static create (): TemplateInputModel {
    return { input: '' }
  }
}
