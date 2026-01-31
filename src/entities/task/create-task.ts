import { v4 } from "uuid";
import { timeToMinutes } from "@entities";
import { type CreateTaskType, Status, type Task } from "@types";
import type { TaskSchemaType } from "@schemas";

export const createTask = (task: TaskSchemaType): Task => {
    const start = timeToMinutes(task.timeInit)
    const end = timeToMinutes(task.timeEnd)

    if (!task.content || task.content.trim().length < 2) {
        throw new Error("Content must have at least 2 characters");
    }
    if (end <= start) {
        throw new Error("End time must be after start time");
    }



    return Object.freeze({
        id: v4(),
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        totalMinutes: end - start,
        status: Status.CREATEAD,
        category: task.category,
        createdAt: new Date(),
        updatedAt: new Date()
    });

}