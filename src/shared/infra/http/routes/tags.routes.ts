import { CreateTagController } from '@modules/tags/useCases/createTag/CreateTagController'
import { ListTagsController } from '@modules/tags/useCases/listTags/ListTagsController'
import { Router } from 'express'

import { ensureAdmin } from '../middlewares'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const tagsRoutes = Router()
const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()

tagsRoutes.post('/', ensureAuthenticated, ensureAdmin, createTagController.handle)
tagsRoutes.get('/', ensureAuthenticated, listTagsController.handle)
