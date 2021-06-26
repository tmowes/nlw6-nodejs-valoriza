import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ComplimentsRepository } from '@modules/tags/infra/typeorm/repositories/ComplimentsRepository'
import { TagsRepository } from '@modules/tags/infra/typeorm/repositories/TagsRepository'
import { IComplimentsRepository } from '@modules/tags/repositories/IComplimentsRepository'
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository)
container.registerSingleton<IComplimentsRepository>(
  'ComplimentsRepository',
  ComplimentsRepository,
)
