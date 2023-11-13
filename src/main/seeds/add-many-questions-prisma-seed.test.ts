/**
 * @jest-environment ./src/main/configs/prisma-jest/prisma-environment-jest.ts
 */

import type { PrismaClient } from '@prisma/client'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import addManyQuestionsPrismaSeed from './add-many-questions-prisma-seed'

let prisma: PrismaClient

describe('AddManyQuestionsPrisma Seed', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getCli()
  })

  beforeEach(async () => {
    await prisma.question.deleteMany()
    await prisma.alternative.deleteMany()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  it('Should create many questions with alternatives on success', async () => {
    const questionsEmpty = await prisma.question.findMany()
    const alternativesEmpty = await prisma.alternative.findMany()
    await addManyQuestionsPrismaSeed
    const questions = await prisma.question.findMany()
    const alternatives = await prisma.alternative.findMany()
    expect(questionsEmpty.length).toBe(0)
    expect(alternativesEmpty.length).toBe(0)
    expect(questions.length).toBe(3)
    expect(alternatives.length).toBe(2)
  })
})
