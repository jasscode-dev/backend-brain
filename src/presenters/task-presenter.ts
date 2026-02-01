import type { Task } from "@types"

export const createTaskPresenter = (task: Task) => {
    return {
        id: task.id,
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        totalSeconds: task.totalSeconds,
        status: task.status,
        category: task.category,

    }

}