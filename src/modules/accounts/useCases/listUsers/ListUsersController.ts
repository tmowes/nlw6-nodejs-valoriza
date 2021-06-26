import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListUsersUseCase } from './ListUsersUseCase'

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listUsers = container.resolve(ListUsersUseCase)
      const allUsers = await listUsers.execute()
      return response.status(200).json(allUsers)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
