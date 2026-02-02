import type { ITaskRepository } from "@interfaces";
import type { TaskCreated } from "@types";
import { AppError } from "@errors";

export const findByIdTaskUseCase = async (repository: ITaskRepository, id: string): Promise<TaskCreated> => {
    const task = await repository.findById(id)

    task ? task : null
    if (!task) {
        throw new AppError("Task not found", 404, "NOT_FOUND")
    }
    return task
}