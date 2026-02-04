export class AppError extends Error {

    constructor(message: string, statusCode = 400) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}