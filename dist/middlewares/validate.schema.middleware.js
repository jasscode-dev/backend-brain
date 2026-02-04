"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, segment = 'body') => {
    return (req, res, next) => {
        const validatedData = schema.parse(req[segment]);
        req[segment] = validatedData;
        next();
    };
};
exports.validateSchema = validateSchema;
