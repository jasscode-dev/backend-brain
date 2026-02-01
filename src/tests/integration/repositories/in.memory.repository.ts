import type { ITaskRepository } from "@interfaces";
import type { Status, TaskCreated, TaskDomain } from "@types";

export const InMemoryTaskRepository = (initialTasks: TaskCreated[] = []): ITaskRepository => {
    const tasks: TaskCreated[] = [...initialTasks]

    return {
        async findById(id: string) {
            return tasks.find(t => t.id === id) ?? null;
        },

        async findByStatus(status: Status) {
            return tasks.find(t => t.status === status) ?? null;
        },

        async save(task: TaskDomain) {
            const created: TaskCreated = {
                ...task,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            tasks.push(created);
            return created;
        },

        async update(id: string, data: Partial<TaskDomain>) {
            const task = await this.findById(id);
            if (!task) throw new Error("Not found");

            Object.assign(task, data, { updatedAt: new Date() });
            return task;
        },

        async findAll() {
            return tasks;
        },

        async remove(id: string) {
            tasks.filter(t => t.id !== id);
        }
    }
}
