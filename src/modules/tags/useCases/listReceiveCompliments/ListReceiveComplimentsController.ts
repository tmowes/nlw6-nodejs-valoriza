import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListReceiveComplimentsUseCase } from './ListReceiveComplimentsUseCase'

export class ListReceiveComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request
      const listReceiveCompliments = container.resolve(ListReceiveComplimentsUseCase)
      const receivedCompliments = await listReceiveCompliments.execute({ user_id })
      return response.status(200).json(receivedCompliments)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
