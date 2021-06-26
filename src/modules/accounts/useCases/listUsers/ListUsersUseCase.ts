import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { classToPlain } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute() {
    const usersList = await this.usersRepository.list()

    if (!usersList) {
      throw new AppError('User list not found!', 404)
    }
    return classToPlain(usersList)
  }
}
