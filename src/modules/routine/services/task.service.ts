import type { IRoutineRepository, ITaskRepository } from "src/modules/routine/repositories/interfaces";
import { type TaskInput, type TaskResponse, type TaskDomain } from "@types";
import { taskDomain } from "@entities";
import { normalizeDate } from "../entities/normalizeDate";
import { RoutineService } from "./routine.service";
import { AppError } from "@errors";


export const TaskService = (
    taskRepository: ITaskRepository,
    routineRepository: IRoutineRepository
) => {

    const findById = async (id: string) => {
        const task = await taskRepository.findById(id)
        if (!task) throw new AppError("Task not found")
        return task
    }

    return {
        create: async (input: TaskInput) => {
            const date = normalizeDate(input.plannedStart)

            const routine = await RoutineService(routineRepository)
                .create(input.userId, date)

            const task = taskDomain.create(input, routine.id)
            return await taskRepository.save(task)
        },

        start: async (id: string) => {
            const task = await findById(id)
            const updated = taskDomain.start(task)
            return await taskRepository.update(id, updated)
        },

        pause: async (id: string) => {
            const task = await findById(id)
            const updated = taskDomain.pause(task)
            return await taskRepository.update(id, updated)
        },

        done: async (id: string) => {
            const task = await findById(id)
            const updated = taskDomain.done(task)
            return await taskRepository.update(id, updated)
        },

        delete: async (id: string) => {
            const task = await findById(id)
            const updated = taskDomain.cancel(task)
            return await taskRepository.update(id,updated)
        },

        findAll: async () => {
            return await taskRepository.findAll()
        },

        findById
    }


}