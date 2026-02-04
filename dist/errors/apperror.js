"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
