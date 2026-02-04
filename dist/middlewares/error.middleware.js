"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const apperror_1 = require("../errors/apperror");
const globalErrorHandler = (error, req, res, next) => {
    if (error instanceof apperror_1.AppError) {
        return res.status(400).json({
            error: error.message,
            data: null
        });
    }
    if (error instanceof zod_1.ZodError) {
        const errorMessage = error.issues.map(err => err.message).join(', ');
        res.status(400).json({
            error: errorMessage,
            data: null
        });
        return;
    }
    res.status(500).json({ error: "Erro interno do servidor", data: null });
    return;
};
exports.globalErrorHandler = globalErrorHandler;
