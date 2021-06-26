import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateComplimentUseCase } from './CreateComplimentUseCase'

export class CreateComplimentController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { message, tag_id, user_receiver } = request.body
      const { user_id } = request
      const createCompliment = container.resolve(CreateComplimentUseCase)
      const newCompliment = await createCompliment.execute({
        tag_id,
        user_receiver,
        user_sender: user_id,
        message,
      })
      return response.status(200).json(newCompliment)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
