
import type { ITaskRepository, Task, ToggleTaskType } from "@types";


export const InMemoryTaskRepository = (initalTasks: Task[] = []): ITaskRepository => {
    const tasks: Task[] = [...initalTasks];


    return {
        save: async (task: Task) => {
            const taskExists = tasks.find(t => t.timeInit === task.timeInit)
            if (taskExists) {
                throw new Error("Task already exists")
            }
            tasks.push(task)
            return task
        },

        findAll: async () => {
            return tasks
        },

        findById: async (id: string) => {
            return tasks.find(task => task.id === id) || null
        },

        update: async (id: string, taskData: ToggleTaskType) => {
            const task = tasks.find(task => task.id === id)
            if (task) {
                task.status = taskData.status
                task.duration = taskData.duration
                task.totalSeconds = taskData.totalSeconds
                task.updatedAt = taskData.updatedAt
                task.startedAt = taskData.startedAt
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