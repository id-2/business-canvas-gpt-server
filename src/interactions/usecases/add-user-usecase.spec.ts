import { User, type UserDto } from '@/domain/entities/user'
import { AddUserUseCase } from './add-user-usecase'

jest.mock('@/domain/entities/user/user', () => ({
  ...jest.requireActual('@/domain/entities/user/user'),
  User: {
    create: jest.fn(() => ({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }))
  }
}))

const makeFakeUserDto = (): UserDto => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: AddUserUseCase
}

const makeSut = (): SutTypes => {
  const sut = new AddUserUseCase()
  return { sut }
}

describe('AddUser UseCase', () => {
  it('Should call User Entity with correct values', async () => {
    const { sut } = makeSut()
    const createSpy = jest.spyOn(User, 'create')
    await sut.perform(makeFakeUserDto())
    expect(createSpy).toHaveBeenCalledWith(makeFakeUserDto())
  })
})
