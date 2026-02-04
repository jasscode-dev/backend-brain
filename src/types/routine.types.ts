import { TaskDomain, TaskModel } from "./task.types"


export type RoutineDomain = {

    userId: string,
    date: Date
    tasks: TaskDomain[]
    status: RoutineStatus
    totalTasks: number
    completedTasks: number


}

export type RoutineResponse = {

    id: string
    date: Date
    userId: string
    routineStatus: RoutineStatus
    totalTasks: number
    completedTasks: number
    completionRate: number
    starEarned: boolean
    xpEarned: number
}

export type RoutineModel = {
    id: string
    userId: string
    date: Date
    routineStatus: RoutineStatus
    totalTasks: number
    completedTasks: number
    completionRate: number
    starEarned: boolean
    xpEarned: number
    tasks: TaskDomain[]
    createdAt: Date
    updatedAt: Date
}

export type RoutineStatus = 'PENDING' | 'INPROGRESS' | 'DONE' | 'PARTIAL'