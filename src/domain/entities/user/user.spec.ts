import { User } from './user'
import { Name } from './value-objects/name/name'

const privateFactory = <T=any>(Cls: any, ...args: any[]): T => {
  return new Cls(...args)
}

describe('User Entity', () => {
  it('Should call Name with correct value', () => {
    const creteSpy = jest.spyOn(Name, 'create')
    User.create({ name: 'any_name' })
    expect(creteSpy).toHaveBeenCalledWith('any_name')
  })
})
