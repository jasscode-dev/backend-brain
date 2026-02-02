
import { timeToSeconds } from "./time";
import { Status, type CreateTaskType, type TaskDomain } from "@types";
import { AppError } from "@errors";

export const createTask = (input: CreateTaskType): TaskDomain => {

    const start = timeToSeconds(input.timeInit)
    const end = timeToSeconds(input.timeEnd)

    if (!input.content || input.content.trim().length < 2) {
        throw new AppError("Content must have at least 2 characters", 400, "VALIDATION_ERROR")
    }

    if (end <= start) {
        throw new AppError("Time init must be less than time end", 400, "VALIDATION_ERROR")
    }


    return Object.freeze({
        content: input.content,
        timeInit: input.timeInit,
        timeEnd: input.timeEnd,
        totalSeconds: 0,
        status: Status.CREATED,
        startedAt: null,
        duration: end - start,
        category: input.category,


    })
}