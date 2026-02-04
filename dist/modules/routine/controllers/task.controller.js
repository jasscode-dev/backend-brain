"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskController = void 0;
const repositories_1 = require("src/modules/routine/repositories");
const services_1 = require("src/modules/routine/services");
const createTaskController = async (req, res) => {
    const newTask = await services_1.TaskService.create(req.body, repositories_1.TaskRepository);
    return res.status(201).json(newTask);
};
exports.createTaskController = createTaskController;
/* export const startTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await TaskService.start(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
export const pauseTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await TaskService.pause(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}
export const doneTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const updatedTask = await TaskService.done(id, TaskRepository)
    return res.status(200).json(createTaskPresenter(updatedTask))
}

export const getAllTasksController: RequestHandler = async (req, res) => {
    const tasks = await TaskService.findAll(TaskRepository)
    return res.status(200).json(tasks.map(createTaskPresenter))
}

export const getTaskByIdController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    const task = await TaskService.findById(TaskRepository, id)
    return res.status(200).json(createTaskPresenter(task))
}

export const removeTaskController: RequestHandler<{ id: string }> = async (req, res) => {
    const { id } = req.params
    await TaskRepository.remove(id)
    return res.status(204).send()
}
 */
