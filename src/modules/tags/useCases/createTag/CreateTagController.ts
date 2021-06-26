import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateTagUseCase } from './CreateTagUseCase'

export class CreateTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body
      const createTag = container.resolve(CreateTagUseCase)
      const newTag = await createTag.execute({ name })
      return response.status(200).json(newTag)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
