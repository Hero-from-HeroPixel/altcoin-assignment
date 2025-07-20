import express from 'express'
import apiRouter from './api/v1/api.route.ts'
import { notFound, expressErrHandler } from './middleware/errorHandler.middleware.ts'
const app = express()

// App routes
app.use('/api/v1', apiRouter)

app.use(notFound)
app.use(expressErrHandler)

export default app