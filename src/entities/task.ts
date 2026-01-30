import { v4 } from "uuid";
import { RequestTask, Status, Task } from "@types";

export const createTask = (task: RequestTask): Task => {

    if (!task.content || task.content.trim().length < 2) {
        throw new Error("Content must have at least 2 characters");
    }
    if (task.timeEnd <= task.timeInit) {
        throw new Error("End time must be after start time");
    }

    return Object.freeze({
        id: v4(),
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        status: Status.CREATEAD,
        createdAt: new Date(),
        updatedAt: new Date()
    });

}