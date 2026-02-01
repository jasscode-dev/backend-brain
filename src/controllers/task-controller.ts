import type { RequestHandler } from "express";
import { registerTask } from "@use-cases";
import { TaskRepository } from "@repositories";
import { TaskSchema } from "@schemas";
import { AppError } from "../erros/app-error";
import { createTaskPresenter } from "../presenters/task-presenter";


export const createTaskController: RequestHandler = async (req, res, next) => {
    try {
        const { content, timeInit, timeEnd, category } = req.body

        const validation = TaskSchema.safeParse({ content, timeInit, timeEnd, category });

        if (!validation.success) {
            const details = validation.error.issues.map(issue => ({
                message: issue.message
            }))
            throw new AppError("Validation failed", 400, 'VALIDATION_ERROR', details);
        }

        const newTask = await registerTask(validation.data, TaskRepository)
        return res.status(201).json(createTaskPresenter(newTask))
    } catch (error) {
        next(error)
    }
}