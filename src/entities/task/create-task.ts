import { v4 } from "uuid";
import { timeToSeconds } from "@entities";
import { Status, type Task } from "@types";
import type { TaskSchemaType } from "@schemas";
import { AppError } from "../../erros/app-error";

export const createTask = (task: TaskSchemaType): Task => {

    const start = timeToSeconds(task.timeInit)
    const end = timeToSeconds(task.timeEnd)

    if (!task.content || task.content.trim().length < 2) {
        throw new AppError("Content must have at least 2 characters", 400, "VALIDATION_ERROR")
    }

    if (end <= start) {
        throw new AppError("End time must be after start time", 400, "VALIDATION_ERROR")
    }


    return Object.freeze({
        id: v4(),
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        totalSeconds: 0,
        status: Status.CREATED,
        startedAt: null,
        duration: end - start,
        category: task.category,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}