import { pauseTask } from "@entities"
import { AppError } from "@errors"
import type { ITaskRepository } from "@types"

export const pauseTaskUseCase = async (id: string, repository: ITaskRepository) => {
    const task = await repository.findById(id)
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }
    const updatedTask = pauseTask(task)
    await repository.update(id, updatedTask)
    return updatedTask
}