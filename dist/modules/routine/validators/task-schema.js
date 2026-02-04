"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSchema = exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    content: zod_1.z.string().min(2, {
        message: "Content must have at least 2 characters"
    }),
    userId: zod_1.z.cuid({ message: "Invalid CUID format" }),
    plannedStart: zod_1.z.string({ message: "Invalid date format" }),
    plannedEnd: zod_1.z.string({ message: "Invalid date format" }),
    category: zod_1.z.enum(["STUDY", "WORK", "PERSONAL", "BREAK"], {
        error: () => ({
            message: "Invalid category"
        })
    })
});
exports.IdSchema = zod_1.z.object({
    id: zod_1.z.uuid({ message: "Invalid UUID format" })
});
