import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { classToPlain } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class ListTagsUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute() {
    const tagList = await this.tagsRepository.list()

    if (!tagList) {
      throw new AppError('Tag list not found!', 404)
    }

    return classToPlain(tagList)
  }
}
