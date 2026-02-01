import { Status, type Task } from "@types";
import { AppError } from "../../erros/app-error";

export const startTask = (task: Task) => {
    if (task.status === Status.DONE) {
        throw new AppError("Task is already done", 400, "VALIDATION_ERROR")
    }
    if (task.status === Status.PENDING) {
        throw new AppError("Task is already running", 400, "VALIDATION_ERROR")
    }
    return {
        status: Status.PENDING,
        startedAt: new Date(),
        duration: task.duration,
        totalSeconds: task.totalSeconds,
        updatedAt: new Date()
    }
}