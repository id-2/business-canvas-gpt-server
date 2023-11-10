/**
 * @jest-environment ./src/main/configs/prisma-jest/prisma-environment-jest.ts
 */

import request from 'supertest'
import app from '@/main/configs/app'

describe('Access Routes', () => {
  it('Should return 201 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any name',
        email: 'any_email@mail.com',
        password: 'abcd1234',
        passwordConfirmation: 'abcd1234'
      })
      .expect(201)
  })
})
