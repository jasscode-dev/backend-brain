import { doneTask } from "@entities"
import { AppError } from "@errors"
import type { ITaskRepository } from "@interfaces"

export const doneTaskUseCase = async (id: string, repository: ITaskRepository) => {
    const task = await repository.findById(id)
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }
    const updatedTask = doneTask(task)
    await repository.update(id, updatedTask)
    return updatedTask
}