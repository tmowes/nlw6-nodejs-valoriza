import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    if (!data.email) {
      throw new AppError('Email incorrect!', 400)
    }

    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new AppError('User already exists!', 400)
    }
    const passwordHashed = await hash(data.password, 8)

    const newUser = this.usersRepository.create({
      ...data,
      password: passwordHashed,
    })

    return newUser
  }
}
