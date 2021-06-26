import auth from '@config/auth'
import { AuthenticateUserDTO } from '@modules/accounts/dtos/AuthenticateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: AuthenticateUserDTO) {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const passwordMatch = await compare(data.password, user.password)

    if (!passwordMatch) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const token = sign({ email: user.email }, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    })

    return token
  }
}
