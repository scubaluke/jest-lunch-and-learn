import { RestHandler } from '../handlers/rest.handler'
import { Router } from 'express'

import { allowGetOnly } from '../helpers/validateMethods'
import {
  validate,
  validateDateFormat,
  validateNumericArray,
} from '../middleware/validateQuery'

const router = Router()

router.route('/').get(RestHandler.respond).all(allowGetOnly)

router
  .route('/add')
  .get(validate(validateNumericArray()), RestHandler.add)
  .all(allowGetOnly)

router
  .route('/users')
  .get(validate(validateDateFormat()), RestHandler.users)
  .all(allowGetOnly)

export default router
