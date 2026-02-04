"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const _errors_1 = require("@errors");
const createUser = (input) => {
    if (!input.name || input.name.trim().length < 2) {
        throw new _errors_1.AppError("Name must have at least 2 characters", 400);
    }
    if (!input.email || input.email.trim().length < 2) {
        throw new _errors_1.AppError("Email must have at least 2 characters", 400);
    }
    if (!input.password || input.password.trim().length < 2) {
        throw new _errors_1.AppError("Password must have at least 2 characters", 400);
    }
    return Object.freeze({
        name: input.name,
        email: input.email,
        password: input.password,
        level: 1,
        xp: 0,
        stars: 0,
        visualRepresentation: 0,
        routines: [],
        createdAt: new Date(),
    });
};
exports.createUser = createUser;
