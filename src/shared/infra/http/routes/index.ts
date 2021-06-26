import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { complimentsRoutes } from './compliments.routes'
import { tagsRoutes } from './tags.routes'
import { usersRoutes } from './users.routes'

export const appRoutes = Router()

appRoutes.use('/users', usersRoutes)
appRoutes.use('/tags', tagsRoutes)
appRoutes.use('/sessions', authenticateRoutes)
appRoutes.use('/compliments', complimentsRoutes)
