"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutine = void 0;
const createRoutine = (userId) => {
    return Object.freeze({
        userId,
        tasks: [],
    });
};
exports.createRoutine = createRoutine;
