import { CreateTagDTO } from '@modules/tags/dtos/CreateTagDTO'
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute(data: CreateTagDTO): Promise<Tag> {
    if (!data.name) {
      throw new AppError('Tag name invalid!', 400)
    }

    const tagExists = await this.tagsRepository.findByName(data.name)

    if (tagExists) {
      throw new AppError('Tag already exists!', 400)
    }

    const newTag = this.tagsRepository.create({ ...data })
    return newTag
  }
}
