import { pauseTask } from "@entities"
import { AppError } from "@errors"
import type { ITaskRepository } from "@interfaces"


export const pauseTaskUseCase = async (id: string, repository: ITaskRepository) => {
    const task = await repository.findById(id)
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }

    const updatedTask = await repository.update(id, pauseTask(task))
    console.log(updatedTask)
    return updatedTask
}