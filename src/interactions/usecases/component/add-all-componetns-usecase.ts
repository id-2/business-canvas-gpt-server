import type { AddAllComponents } from '@/domain/contracts'
import type { AddAllComponentsRepo } from '@/interactions/contracts/db'
import type { ComponentModel } from '@/domain/models/db-models'
import { Component, type ComponentName } from '@/domain/entities/component'

export class AddAllComponentsUseCase implements AddAllComponents {
  constructor (private readonly addAllComponentsRepo: AddAllComponentsRepo) {}

  async perform (): Promise<void> {
    const components = Component.createMany()
    const componentModels: ComponentModel[] = []
    let count = 0
    for (const component of components) {
      const name = Component.getComponent(component) as ComponentName
      count++
      const id = `any_id_${count}`
      componentModels.push({ id, name })
    }
    await this.addAllComponentsRepo.addAll(componentModels)
  }
}
