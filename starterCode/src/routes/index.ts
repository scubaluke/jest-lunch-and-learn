import { RestHandler } from '../handlers/rest.handler'
import { Router } from 'express'

import { allowGetOnly } from '../helpers/validateMethods'

const router = Router()

router.route('/').get(RestHandler.respond).all(allowGetOnly)

router.route('/add').get(RestHandler.add).all(allowGetOnly)

router.route('/').get(RestHandler.respond).all(allowGetOnly)

export default router
