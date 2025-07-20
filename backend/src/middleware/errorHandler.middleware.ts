/**
 * Custom Express error-handling middleware.
 *
 * Components:
 * - `notFound`: Middleware to catch 404 errors for undefined routes.
 * - `expressErrHandler`: Central error handler that formats and sends error responses.
 *
 * Usage:
 * - Mount `notFound` at the end of route definitions to catch unhandled routes.
 * - Place `expressErrHandler` after all middleware to intercept thrown or forwarded errors.
 *
 * Error Model:
 * - Relies on `ExpressError` utility class which extends the native Error with a statusCode.
 */
import type { Response, Request, NextFunction } from 'express'
import ExpressError from '../utils/ExpressError.util.ts'

// Middleware to catch undefined routes and forward a 404 error
export const notFound = (req: Request, res: Response, next: NextFunction) =>
    next(new ExpressError('Route not found', 404))

// Global error-handling middleware
export const expressErrHandler = (
    err: ExpressError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { statusCode = 500 } = err
    const message = err.message ?? 'Oh no! Something went wrong'
    res.status(statusCode).json({ message })
}