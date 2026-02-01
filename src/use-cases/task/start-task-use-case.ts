import type { ITaskRepository } from "@types"
import { AppError } from "../../erros/app-error"
import { startTask } from "@entities"

export const startTaskUseCase = async (id: string, repository: ITaskRepository) => {
    const task = await repository.findById(id)
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }
    const updatedTask = startTask(task)
    await repository.update(id, updatedTask)
    return updatedTask
}