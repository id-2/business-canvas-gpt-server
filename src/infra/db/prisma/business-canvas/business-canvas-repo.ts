import type { BusinessCanvasModel } from '@/domain/models/db-models'
import type { AddBusinessCanvasRepo } from '@/interactions/contracts/db'
import type { ComponentName } from '@/domain/entities/component'
import { PrismaHelper } from '../helpers/prisma-helper'

export class BusinessCanvasPrismaRepo implements AddBusinessCanvasRepo {
  async add (dto: BusinessCanvasModel): Promise<void> {
    const { components, createdAt, id, name, userId } = dto
    const prisma = await PrismaHelper.getCli()
    await prisma.businessCanvas.create({ data: { id, name, createdAt, userId } })
    const componentNames = Object.keys(components)
    for (const componentName of componentNames) {
      const key = componentName as ComponentName
      await prisma.businessCanvasComponent.create({
        data: { businessCanvasId: id, componentName, topics: components[key] }
      })
    }
  }
}
