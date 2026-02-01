import type { RequestHandler } from "express";
import { createTaskUseCase, doneTaskUseCase, pauseTaskUseCase } from "@use-cases";
import { TaskSchema } from "@schemas";
import { AppError } from "@errors";
import { createTaskPresenter } from "@presenters";
import { startTaskUseCase } from "@use-cases";
import { TaskRepository } from "@repositories";
import { findAllTaskUseCase } from "../use-cases/find.all.task";
import { findByIdTaskUseCase } from "../use-cases/find.by.id.task";


export const createTaskController: RequestHandler = async (req, res) => {
    const { content, timeInit, timeEnd, category } = req.body

    const validation = TaskSchema.safeParse({ content, timeInit, timeEnd, category });

    if (!validation.success) {
        const details = validation.error.issues.map((issue: any) => ({
            message: issue.message
        }))
        throw new AppError("Validation failed", 400, 'VALIDATION_ERROR', details);
    }

    const newTask = await createTaskUseCase(validation.data, TaskRepository)
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
export const pauseTaskController: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (typeof id !== 'string') {
        throw new AppError("Invalid task ID", 400, 'VALIDATION_ERROR')
    }
    const updatedTask = await pauseTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
export const doneTaskController: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (typeof id !== 'string') {
        throw new AppError("Invalid task ID", 400, 'VALIDATION_ERROR')
    }
    const updatedTask = await doneTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}

export const getAllTasksController: RequestHandler = async (req, res) => {
    const tasks = await findAllTaskUseCase(TaskRepository)
    console.log(tasks)
    return res.status(200).json(tasks.map(createTaskPresenter))
}

export const getTaskByIdController: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (typeof id !== 'string') {
        throw new AppError("Invalid task ID", 400, 'VALIDATION_ERROR')
    }
    const task = await findByIdTaskUseCase(TaskRepository, id)
    return res.status(200).json(createTaskPresenter(task))
}

export const removeTaskController: RequestHandler = async (req, res) => {
    const { id } = req.params

    if (typeof id !== 'string') {
        throw new AppError("Invalid task ID", 400, 'VALIDATION_ERROR')
    }
    await TaskRepository.remove(id)
    return res.status(204).send()
}
