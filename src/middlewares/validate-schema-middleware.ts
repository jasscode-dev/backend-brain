import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { AppError } from "@errors";

type RequestSegment = 'body' | 'params' | 'query';

export const validateSchema = (schema: ZodSchema, segment: RequestSegment = 'body'): RequestHandler => {
    return (req, res, next) => {
        const validation = schema.safeParse(req[segment]);


        if (!validation.success) {
            const details = validation.error.issues.map((issue) => ({
                message: issue.message
            }));
            throw new AppError(`Validation failed on ${segment}`, 400, "VALIDATION_ERROR", details);
        }

        req[segment] = validation.data;
        next();
    };
};
