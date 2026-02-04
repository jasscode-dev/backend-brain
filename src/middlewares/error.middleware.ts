import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/apperror";

export const globalErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {


    if (error instanceof AppError) {
        console.log(error)
        return res.status(400).json({
            error: error.message,
            data: null
        });
    }
    if (error instanceof ZodError) {
        console.log(error.issues)
        const errorMessage = error.issues.map(err => err.message).join(', ')
        res.status(400).json({
            error: errorMessage,
            data: null
        });
        return;
    }

    console.error("Internal Server Error Details:", error);

    res.status(500).json({ error: "Erro interno do servidor", data: null })
    return;
}