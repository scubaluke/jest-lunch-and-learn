import express from 'express'

import routes from './routes'
import { errorHandler } from './helpers/errorHandler'

const app = express()

app.use(routes)

app.use(errorHandler)
export default app
