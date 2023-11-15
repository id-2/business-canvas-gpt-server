import type { ComponentName } from './component'
import type { BaseModel } from './util/base-model'

export interface BusinessCanvasModel extends BaseModel {
  name: string
  userId: string
  components: Record<ComponentName, string[]>
}
