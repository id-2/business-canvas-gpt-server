import type { AddAllComponents } from '@/domain/contracts'
import { Component } from '@/domain/entities/component'

export class AddAllComponentsUseCase implements AddAllComponents {
  async perform (): Promise<void> {
    Component.createMany()
  }
}
