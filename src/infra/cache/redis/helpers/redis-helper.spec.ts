import { RedisHelper as sut } from './redis-helper'

describe('RedisHelper', () => {
  afterEach(async () => {
    await sut.disconnect()
  })

  it('Should create only once Redis instance', () => {
    const redis1 = sut.getInstance()
    const redis2 = sut.getInstance()
    expect(redis1).toBe(redis2)
  })
})
