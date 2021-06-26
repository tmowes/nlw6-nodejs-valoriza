import { CreateComplimentDTO } from '@modules/tags/dtos/CreateComplimentDTO'
import { IComplimentsRepository } from '@modules/tags/repositories/IComplimentsRepository'
import { getRepository, Repository } from 'typeorm'

import { Compliment } from '../entities/Compliment'

export class ComplimentsRepository implements IComplimentsRepository {
  private repository: Repository<Compliment>
  constructor() {
    this.repository = getRepository(Compliment)
  }

  async create(data: CreateComplimentDTO): Promise<Compliment> {
    const compliment = this.repository.create({ ...data })
    await this.repository.save(compliment)
    return compliment
  }

  async listBySenderId(id: string): Promise<Compliment[]> {
    const allCompliments = await this.repository.find({
      where: {
        user_sender: id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    })
    return allCompliments
  }

  async listByReceiverId(id: string): Promise<Compliment[]> {
    const allCompliments = await this.repository.find({
      where: {
        user_receiver: id,
      },
      relations: ['userSender', 'userReceiver', 'tag'],
    })
    return allCompliments
  }
}
