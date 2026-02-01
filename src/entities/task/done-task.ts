import { Status, type Task } from "@types";
import { AppError } from "../../erros/app-error";
import { calculateAccumulatedSeconds } from "./time";

export const doneTask = (task: Task) => {
    if (task.status === Status.DONE) {
        throw new AppError("Task is already done", 400, "VALIDATION_ERROR")
    }
    if (task.status === Status.CREATED || task.status === Status.PAUSED || !task.startedAt) {
        throw new AppError("Task is not started", 400, "VALIDATION_ERROR")
    }

    const totalSeconds = calculateAccumulatedSeconds(task.startedAt, task.totalSeconds);

    return {
        status: Status.DONE,
        startedAt: null,
        duration: task.duration,
        totalSeconds,
        updatedAt: new Date()
    }
}