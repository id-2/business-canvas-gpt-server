import { UuidAdapter } from './uuid-adapter'
import * as uuid from 'uuid'

jest.mock('uuid')

describe('Uuid Adapter', () => {
  it('Should call v4 uuid', () => {
    const sut = new UuidAdapter()
    const v4Spy = jest.spyOn(uuid, 'v4')
    sut.build()
    expect(v4Spy).toHaveBeenCalled()
  })
})
