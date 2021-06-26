import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { Response, Request, NextFunction } from 'express'

import AppError from '@shared/errors/AppError'

export const ensureAdmin = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const { user_id } = request
  const usersRepository = new UsersRepository()
  const { isAdmin } = await usersRepository.findById(user_id)

  if (!isAdmin) {
    throw new AppError('User is not admin!', 401)
  }

  next()
}
