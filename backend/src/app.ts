import express from 'express'
import apiRouter from './api/v1/api.route.ts'
import { notFound, expressErrHandler } from './middleware/errorHandler.middleware.ts'
import { corsMiddleware } from './middleware/cors.middleware.ts'
import { rateLimiter } from './middleware/rateLimit.middleware.ts'

const app = express()


//rate limiting
app.use(rateLimiter)

//cors
app.use(corsMiddleware)

// App routes
app.use('/api/v1', apiRouter)

app.use(notFound)
app.use(expressErrHandler)

export default app