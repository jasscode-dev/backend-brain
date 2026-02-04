import type { ITaskRepository } from "src/modules/routine/repositories/interfaces";
import type { TaskResponse, TaskDomain } from "@types";

export const InMemoryTaskRepository = (initialTasks: TaskResponse[] = []): ITaskRepository => {
    const tasks: TaskResponse[] = [...initialTasks]


    return {
        async findById(id: string) {
            return tasks.find(t => t.id === id) ?? null;
        },


        async save(task: TaskDomain) {
            const created: TaskResponse = {
                ...task,
                id: crypto.randomUUID(),
            };

            tasks.push(created);
            return created;
        },
        async findAll() {
            return tasks;
        },


    }
}
