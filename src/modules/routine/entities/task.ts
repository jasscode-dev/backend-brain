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
            actualDurationSec: 0,
            category: input.category,
        })
    },
    /*  start: (task: TaskDomain) => {
         if (task.status === Status.DONE) {
             throw new AppError("Task is already done", 400)
         }
         if (task.status === Status.PENDING) {
             throw new AppError("Task is already running", 400)
         }
         return {
             status: Status.PENDING,
             startedAt: new Date(),
             duration: task.durationSec,
             totalSeconds: task.totalSeconds,
             updatedAt: new Date()
         }
     }, */
    /*  pause: (task: TaskDomain) => {
         if (task.status === Status.DONE) {
             throw new AppError("Task is already done", 400)
         }
         if (task.status === Status.CREATED || task.status === Status.PAUSED || !task.startedAt) {
             throw new AppError("Task is not started", 400)
         }
 
         const totalSeconds = calculateAccumulatedSeconds(task.startedAt, task.totalSeconds);
 
         return {
             status: Status.PAUSED,
             startedAt: null,
             duration: task.duration,
             totalSeconds,
             updatedAt: new Date()
         }
     },
     done: (task: TaskDomain) => {
         if (task.status === Status.DONE) {
             throw new AppError("Task is already done", 400)
         }
         if (task.status === Status.CREATED || task.status === Status.PAUSED || !task.startedAt) {
             throw new AppError("Task is not started", 400)
         }
 
         const totalSeconds = calculateAccumulatedSeconds(task.startedAt, task.totalSeconds);
 
         return {
             status: Status.DONE,
             startedAt: null,
             duration: task.duration,
             totalSeconds,
             updatedAt: new Date()
         }
     } */
}

