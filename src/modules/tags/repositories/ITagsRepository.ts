import { CreateTagDTO } from '../dtos/CreateTagDTO'
import { Tag } from '../infra/typeorm/entities/Tag'

export interface ITagsRepository {
  findByName(name: string): Promise<Tag>
  findById(id: string): Promise<Tag>
  create(data: CreateTagDTO): Promise<Tag>
  list(): Promise<Tag[]>
}
