import type { TaskCreated, TaskDomain } from "@types"

export const createTaskPresenter = (task: TaskCreated) => {
    return {
        id: task.id,
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        duration: task.duration,
        status: task.status,
        category: task.category,

    }

}