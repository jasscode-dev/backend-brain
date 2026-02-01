
import { AppError } from "@errors"
import { startTask } from "@entities"
import type { ITaskRepository } from "@interfaces"
import { Status } from "@types"

export const startTaskUseCase = async (id: string, repository: ITaskRepository) => {
    const task = await repository.findById(id)
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }
    const existing = await repository.findByStatus(Status.PENDING)
    if (existing) {
        throw new AppError("There is already an active task", 400, "TASK_ALREADY_RUNNING")
    }
    const updatedTask = await repository.update(id, startTask(task))
    return updatedTask
}