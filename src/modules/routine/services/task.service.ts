import type { IRoutineRepository, ITaskRepository } from "src/modules/routine/repositories/interfaces";
import { type TaskInput, type TaskResponse, type TaskDomain } from "@types";
import { taskDomain } from "@entities";
import { normalizeDate } from "../entities/normalizeDate";
import { RoutineService } from "./routine.service";


export const TaskService = (
    taskRepository: ITaskRepository,
    routineRepository: IRoutineRepository
) => {
    return {
        create: async (input: TaskInput) => {
            const date = normalizeDate(input.plannedStart)
            const routine = await RoutineService(routineRepository).create(input.userId, date)
            const task = taskDomain.create(input, routine.id)
            return await taskRepository.save(task)



        },
        start: async (id: string) => {
            const task = await taskRepository.findById(id)
            if (!task) throw new Error("Task not found")
            const updated = taskDomain.start(task as any)
            return await taskRepository.update(id, updated)
        },
        pause: async (id: string) => {
            const task = await taskRepository.findById(id)
            if (!task) throw new Error("Task not found")
            const updated = taskDomain.pause(task as any)
            return await taskRepository.update(id, updated)
        },
        done: async (id: string) => {
            const task = await taskRepository.findById(id)
            if (!task) throw new Error("Task not found")
            const updated = taskDomain.done(task as any)
            return await taskRepository.update(id, updated)
        },
        findAll: async () => {
            return await taskRepository.findAll()
        }
    }

}