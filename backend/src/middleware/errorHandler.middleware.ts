import type { Response, Request, NextFunction } from 'express'
import ExpressError from '../utils/ExpressError.util.ts'

// 404 err handler
export const notFound = (req: Request, res: Response, next: NextFunction) => next(new ExpressError('Route not found', 404))

// App err handler
export const expressErrHandler = (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    const message = err.message ?? 'Oh no! Something went wrong'
    res.status(statusCode).json({ message });
}
