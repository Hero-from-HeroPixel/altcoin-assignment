/**
 * Express Application Setup
 *
 * This file initializes and configures the Express server.
 * It includes middleware for security, error handling, and routing.
 *
 * Middleware Stack:
 * - rateLimiter: Prevents abuse by throttling requests from clients.
 * - corsMiddleware: Enables CORS to allow requests from frontend clients.
 * - apiRouter: Handles all versioned API routes under /api/v1.
 * - notFound: Catches 404 errors when no route matches the request.
 * - expressErrHandler: Handles internal server errors and sends JSON responses.
 *
 * Modular architecture:
 * - Routes and middleware are organized under their respective folders for maintainability.
 * - Supports TypeScript integration (.ts files imported via ES modules).
 */

import express from 'express'
import apiRouter from './api/v1/api.route.ts'
import { notFound, expressErrHandler } from './middleware/errorHandler.middleware.ts'
import { corsMiddleware } from './middleware/cors.middleware.ts'
import { rateLimiter } from './middleware/rateLimit.middleware.ts'

const app = express()

// Apply rate limiting to mitigate brute-force and abuse attacks
app.use(rateLimiter)

// Enable CORS for frontend-backend communication
app.use(corsMiddleware)

// Register versioned API routes
app.use('/api/v1', apiRouter)

// Catch 404 errors for unmatched routes
app.use(notFound)

// Handle unexpected server errors with standardized JSON response
app.use(expressErrHandler)

export default app