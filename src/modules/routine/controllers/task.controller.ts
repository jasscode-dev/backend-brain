
import { TaskService } from "src/modules/routine/services";
import type { Request, Response } from "express";
import { ITaskRepository } from "@interfaces";
import { IRoutineRepository } from "@interfaces";


type IdParam = { id: string }
export const TaskController = (TaskRepository: ITaskRepository, RoutineRepository: IRoutineRepository) => {
    const taskService = TaskService(TaskRepository, RoutineRepository)
    return {
        create: async (req: Request, res: Response) => {
            const { userId, content, plannedStart, plannedEnd, category } = req.body
            const newTask = await taskService.create({ userId, content, plannedStart, plannedEnd, category })
            return res.status(201).json(newTask)
        },
        getAll: async (req: Request, res: Response) => {
            const tasks = await taskService.findAll()
            return res.status(200).json(tasks)
        },
        start: async (req: Request<IdParam>, res: Response) => {
            const { id } = req.params
            const task = await taskService.start(id)
            return res.status(200).json(task)
        },
        pause: async (req: Request<IdParam>, res: Response) => {
            const { id } = req.params
            const task = await taskService.pause(id)
            return res.status(200).json(task)
        },
        done: async (req: Request<IdParam>, res: Response) => {
            const { id } = req.params
            const task = await taskService.done(id)
            return res.status(200).json(task)
        },
        delete: async (req: Request<IdParam>, res: Response) => {
            const { id } = req.params
            await taskService.delete(id)
            return res.status(204).send()
        }
    }
}

