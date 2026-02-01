import type { RequestHandler } from "express";
import { registerTask } from "@use-cases";
import { TaskRepository } from "src/modules/tasks/repositories";
import { TaskSchema } from "@schemas";
import { AppError } from "@errors";
import { createTaskPresenter } from "@presenters";
import { startTaskUseCase } from "@use-cases";


export const createTaskController: RequestHandler = async (req, res) => {
    const { content, timeInit, timeEnd, category } = req.body

    const validation = TaskSchema.safeParse({ content, timeInit, timeEnd, category });

    if (!validation.success) {
        const details = validation.error.issues.map((issue: any) => ({
            message: issue.message
        }))
        throw new AppError("Validation failed", 400, 'VALIDATION_ERROR', details);
    }

    const newTask = await registerTask(validation.data, TaskRepository)
    return res.status(201).json(createTaskPresenter(newTask))
}

export const startTaskController: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (typeof id !== 'string') {
        throw new AppError("Invalid task ID", 400, 'VALIDATION_ERROR')
    }
    const updatedTask = await startTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
