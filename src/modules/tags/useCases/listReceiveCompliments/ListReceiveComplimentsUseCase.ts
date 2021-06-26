import { ListReceiveComplimentsDTO } from '@modules/tags/dtos/ListReceiveComplimentsDTO'
import { Compliment } from '@modules/tags/infra/typeorm/entities/Compliment'
import { IComplimentsRepository } from '@modules/tags/repositories/IComplimentsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class ListReceiveComplimentsUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,
  ) {}

  async execute({ user_id }: ListReceiveComplimentsDTO): Promise<Compliment[]> {
    const complimentList = await this.complimentsRepository.listByReceiverId(user_id)

    if (!complimentList) {
      throw new AppError('Compliment list not found!', 404)
    }

    return complimentList
  }
}
