import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListSendedComplimentsUseCase } from './ListSendedComplimentsUseCase'

export class ListSendedComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request
      const listSendedCompliments = container.resolve(ListSendedComplimentsUseCase)
      const sendedCompliments = await listSendedCompliments.execute({ user_id })
      return response.status(200).json(sendedCompliments)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
