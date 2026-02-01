import type { Request, Response, NextFunction } from 'express';
import { AppError } from './app-error';


export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            code: error.code,
            message: error.message,
            details: error.details,

        });
    }
    console.error(' [Unexpected Error]:', error);
    return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro interno no servidor',
    });
};