import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CreateComplimentDTO } from '@modules/tags/dtos/CreateComplimentDTO'
import { Compliment } from '@modules/tags/infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '@modules/tags/repositories/IComplimentsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class CreateComplimentUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateComplimentDTO): Promise<Compliment> {
    const receiverExists = await this.usersRepository.findById(data.user_receiver)

    if (data.user_receiver === data.user_sender) {
      throw new AppError('User receiver invalid!', 400)
    }

    if (!receiverExists) {
      throw new AppError('User not found!', 404)
    }

    const newCompliment = this.complimentsRepository.create({ ...data })
    return newCompliment
  }
}
