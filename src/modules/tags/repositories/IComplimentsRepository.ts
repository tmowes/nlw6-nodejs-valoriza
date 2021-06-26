import { CreateComplimentDTO } from '../dtos/CreateComplimentDTO'
import { Compliment } from '../infra/typeorm/entities/Compliment'

export interface IComplimentsRepository {
  create(data: CreateComplimentDTO): Promise<Compliment>
  listBySenderId(id: string): Promise<Compliment[]>
  listByReceiverId(id: string): Promise<Compliment[]>
}
