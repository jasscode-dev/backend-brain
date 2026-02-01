import type { ITaskRepository } from "@interfaces";
import type { TaskCreated } from "@types";

export const findAllTaskUseCase = async (repository: ITaskRepository): Promise<TaskCreated[]> => {
    return await repository.findAll()

}