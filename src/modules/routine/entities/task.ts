import { TaskInput, TaskDomain, Category } from "@types";
import { AppError } from "@errors";



export const taskDomain = {
    create: (input: TaskInput, routineId: string): TaskDomain => {
        const plannedStart = new Date(input.plannedStart)
        const plannedEnd = new Date(input.plannedEnd)

        if (!input.content || input.content.trim().length < 2) {
            throw new AppError("Content must have at least 2 characters", 400)
        }

        if (plannedEnd.getTime() <= plannedStart.getTime()) {
            throw new AppError("PlannedEnd must be after plannedStart", 400)
        }
        if (
            Number.isNaN(plannedStart.getTime()) ||
            Number.isNaN(plannedEnd.getTime())
        ) {
            throw new AppError("Invalid date format", 400)
        }
        const durationSec = (plannedEnd.getTime() - plannedStart.getTime()) / 1000

        return Object.freeze({
            userId: input.userId,
            content: input.content,
            status: 'PENDING',
            routineId,
            plannedStart,
            plannedEnd,
            durationSec,
            totalSeconds: 0,
            startedAt: null,
            finishedAt: null,
            cancelledAt: null,
            actualDurationSec: 0,
            category: input.category,
        })
    },
    start: (task: TaskDomain) => {
        if (task.status === 'DONE') {
            throw new AppError("Task is already done", 400)
        }
        if (task.status === 'INPROGRESS') {
            throw new AppError("Task is already running", 400)
        }
        return {
            ...task,
            status: 'INPROGRESS' as const,
            startedAt: new Date(),

        }

    },
    pause: (task: TaskDomain) => {
        if (task.status !== 'INPROGRESS') {
            throw new AppError("Task is not running", 400)
        }
        if (!task.startedAt) {
            throw new AppError("Task is not running", 400)
        }
        const now = new Date()

        const difSec = Math.floor((now.getTime() - task.startedAt.getTime()) / 1000)
        const totalSeconds = task.totalSeconds + difSec
        return {
            ...task,
            status: 'PAUSED' as const,
            startedAt: null,
            totalSeconds,

        }
    },
    done: (task: TaskDomain) => {
        if (task.status === 'DONE') {
            throw new AppError("Task is already done", 400)
        }

        let totalSeconds = task.totalSeconds
        let finishedAt = new Date()
        if (task.status === 'INPROGRESS' && task.startedAt) {
            totalSeconds += Math.floor(
                (finishedAt.getTime() - task.startedAt.getTime()) / 1000
            )
        }

        return {
            ...task,
            status: 'DONE' as const,
            finishedAt: new Date(),
            startedAt: null,
            duration: task.durationSec,
            totalSeconds,
            actualDurationSec: totalSeconds,

        }
    },
    cancel: (task: TaskDomain) => {
        if (task.status === 'DONE') {
            throw new AppError("Task is already done", 400)
        }
        return {
            ...task,
            status: 'CANCELLED' as const,
            cancelledAt: new Date(),



        }
    },


}

