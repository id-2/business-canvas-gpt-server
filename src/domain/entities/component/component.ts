export type ComponentName =
  | 'customerSegments'
  | 'valuePropositions'
  | 'channels'
  | 'customerRelationships'
  | 'revenueStreams'
  | 'keyResources'
  | 'keyActivities'
  | 'keyPartnerships'
  | 'costStructure'

export class Component {
  private constructor (name: string) {
    Object.freeze(this)
  }
}
