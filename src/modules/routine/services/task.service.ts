import type { IRoutineRepository, ITaskRepository } from "src/modules/routine/repositories/interfaces";
import { type TaskInput, type TaskResponse } from "@types";
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
        findAll: async () => {
            return await taskRepository.findAll()
        }
    }

}