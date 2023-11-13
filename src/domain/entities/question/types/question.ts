import type { Alternative } from './alternative'

export interface Question {
  content: string
  alternatives?: Alternative[]
}
