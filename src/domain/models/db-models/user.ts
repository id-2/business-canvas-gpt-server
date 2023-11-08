import type { BaseModel } from './util/base-model'

export interface UserModel extends BaseModel {
  name: string
  email: string
  password: string
  roleId: string
}
