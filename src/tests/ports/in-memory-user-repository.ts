
import type { ITaskRepository, Status, Task } from "../../types";

export const InMemoryTaskRepository = (initalTasks: Task[] = []): ITaskRepository => {
    const tasks: Task[] = [...initalTasks];


    return {
        save: async (task: Task) => {
            tasks.push(task)
            return task
        },

        findAll: async () => {
            return tasks
        },

        findById: async (id: string) => {
            return tasks.find(task => task.id === id) || null
        },

        update: async (id: string, status: Status) => {
            const task = tasks.find(task => task.id === id)
            if (task) {
                task.status = status
            }
            return task || null
        },

        remove: async (id: string) => {
            const task = tasks.find(task => task.id === id)
            if (task) {
                tasks.splice(tasks.indexOf(task), 1)
            }
        }
    }

}