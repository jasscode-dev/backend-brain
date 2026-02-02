import type { RequestHandler } from "express";
import { createTaskUseCase, doneTaskUseCase, pauseTaskUseCase } from "@use-cases";
import { createTaskPresenter } from "@presenters";
import { startTaskUseCase } from "@use-cases";
import { TaskRepository } from "@repositories";
import { findAllTaskUseCase } from "../use-cases/find-all-task";
import { findByIdTaskUseCase } from "../use-cases/find-by-id-task";

export const createTaskController: RequestHandler = async (req, res) => {
    const newTask = await createTaskUseCase(req.body, TaskRepository)
    return res.status(201).json(createTaskPresenter(newTask))
}
export const startTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await startTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
export const pauseTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await pauseTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
export const doneTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await doneTaskUseCase(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}

export const getAllTasksController: RequestHandler = async (req, res) => {
    const tasks = await findAllTaskUseCase(TaskRepository)
    console.log(tasks)
    return res.status(200).json(tasks.map(createTaskPresenter))
}

export const getTaskByIdController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const task = await findByIdTaskUseCase(TaskRepository, id)
    return res.status(200).json(createTaskPresenter(task))
}

export const removeTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    await TaskRepository.remove(id)
    return res.status(204).send()
}