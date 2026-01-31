
import { createTask } from "@entities";
import type { ITaskRepository, CreateTaskType } from "../types";

export const registerTask = async (task: CreateTaskType, repository: ITaskRepository) => {




    const newTask = createTask(task)
    await repository.save(newTask)
    return newTask

}