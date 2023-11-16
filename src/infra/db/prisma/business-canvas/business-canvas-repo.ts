import type { BusinessCanvasModel } from '@/domain/models/db-models'
import type { AddBusinessCanvasRepo } from '@/interactions/contracts/db'
import { PrismaHelper } from '../helpers/prisma-helper'

export class BusinessCanvasPrismaRepo implements AddBusinessCanvasRepo {
  async add (dto: BusinessCanvasModel): Promise<void> {
    const { components, createdAt, id, name, userId } = dto
    const prisma = await PrismaHelper.getCli()
    await prisma.businessCanvas.create({ data: { id, name, createdAt, userId } })
    const componentNames = Object.keys(components)
    for (const componentName of componentNames) {
      await prisma.businessCanvasComponent.create({
        data: { businessCanvasId: id, componentName }
      })
    }
  }
}
