
import { createTask } from "@entities";
import type { ITaskRepository, CreateTaskType } from "../types";
import type { TaskSchemaType } from "../schemas/task-schema";

export const registerTask = async (task: TaskSchemaType, repository: ITaskRepository) => {

    const newTask = createTask(task)
    await repository.save(newTask)
    return newTask

}