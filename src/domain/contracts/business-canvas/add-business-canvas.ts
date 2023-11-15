import type { BusinessCanvasOutputModel } from '@/domain/models/output-models'

export type AddBusinessCanvasDto = BusinessCanvasOutputModel & { userId: string }

export interface AddBusinessCanvas {
  perform: (dto: AddBusinessCanvasDto) => Promise<void>
}
