
/**
 * Custom error class for Express applications.
 * 
 * Extends the built-in Error class to include an HTTP status code,
 * allowing for more informative error handling in Express routes and middleware.
 *
 * @extends Error
 * 
 * @example
 * throw new ExpressError('Resource not found', 404);
 */
class ExpressError extends Error {
    statusCode: number = 500
    constructor(message: string, statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ExpressError;