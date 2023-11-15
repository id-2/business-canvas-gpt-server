import type { ComponentName } from '../db-models'

export type BusinessCanvasApiModel = Record<ComponentName, string[]> & { name: string }
