import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListTagsUseCase } from './ListTagsUseCase'

export class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listTags = container.resolve(ListTagsUseCase)
      const allTags = await listTags.execute()
      return response.status(200).json(allTags)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
