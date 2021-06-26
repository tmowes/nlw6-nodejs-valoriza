import { CreateComplimentController } from '@modules/tags/useCases/createCompliment/CreateComplimentController'
import { ListReceiveComplimentsController } from '@modules/tags/useCases/listReceiveCompliments/ListReceiveComplimentsController'
import { ListSendedComplimentsController } from '@modules/tags/useCases/listSendedCompliments/ListSendedComplimentsController'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const complimentsRoutes = Router()
const createComplimentController = new CreateComplimentController()
const listSendedComplimentsController = new ListSendedComplimentsController()
const listReceiveComplimentsController = new ListReceiveComplimentsController()

complimentsRoutes.post('/', ensureAuthenticated, createComplimentController.handle)

complimentsRoutes.get(
  '/sended',
  ensureAuthenticated,
  listSendedComplimentsController.handle,
)

complimentsRoutes.get(
  '/received',
  ensureAuthenticated,
  listReceiveComplimentsController.handle,
)
