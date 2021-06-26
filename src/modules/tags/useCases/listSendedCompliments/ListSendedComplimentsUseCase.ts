import { ListSendedComplimentsDTO } from '@modules/tags/dtos/ListSendedComplimentsDTO'
import { Compliment } from '@modules/tags/infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '@modules/tags/repositories/IComplimentsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class ListSendedComplimentsUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,
  ) {}

  async execute({ user_id }: ListSendedComplimentsDTO): Promise<Compliment[]> {
    const complimentList = await this.complimentsRepository.listBySenderId(user_id)

    if (!complimentList) {
      throw new AppError('Compliment list not found!', 404)
    }

    return complimentList
  }
}
