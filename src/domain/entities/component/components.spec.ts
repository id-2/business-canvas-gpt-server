import { Component as sut } from './component'

describe('Component Entity', () => {
  it('Should create many Components', async () => {
    const result = sut.createMany()
    expect(result).toEqual([
      { name: 'customerSegments' },
      { name: 'valuePropositions' },
      { name: 'channels' },
      { name: 'customerRelationships' },
      { name: 'revenueStreams' },
      { name: 'keyResources' },
      { name: 'keyActivities' },
      { name: 'keyPartnerships' },
      { name: 'costStructure' }
    ])
  })
})
