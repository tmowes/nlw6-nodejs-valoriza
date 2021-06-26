import { CreateTagDTO } from '@modules/tags/dtos/CreateTagDTO'
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { getRepository, Repository } from 'typeorm'

import { Tag } from '../entities/Tag'

export class TagsRepository implements ITagsRepository {
  private repository: Repository<Tag>
  constructor() {
    this.repository = getRepository(Tag)
  }

  async create(data: CreateTagDTO): Promise<Tag> {
    const tag = this.repository.create({ ...data })
    await this.repository.save(tag)
    return tag
  }

  async list(): Promise<Tag[]> {
    const allTags = await this.repository.find()
    return allTags
  }

  async findByName(name: string): Promise<Tag> {
    const tag = await this.repository.findOne({ name })
    return tag
  }

  async findById(id: string): Promise<Tag> {
    const tag = await this.repository.findOne(id)
    return tag
  }
}
