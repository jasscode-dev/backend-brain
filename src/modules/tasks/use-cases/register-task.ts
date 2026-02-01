
import { createTask } from "@entities";
import type { ITaskRepository } from "@interfaces";
import type { CreateTaskType } from "@types";

export const createTaskUseCase = async (input: CreateTaskType, repository: ITaskRepository) => {

    const newTask = await repository.save(createTask(input))
    return newTask


}