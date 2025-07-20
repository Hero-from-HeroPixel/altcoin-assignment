class ExpressError extends Error {
    statusCode: number = 500
    constructor(message: string, statusCode: number) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ExpressError;