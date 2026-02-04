import { AppError } from "@errors";
import { IRoutineRepository } from "../repositories/interfaces/routine.interface";
import { createRoutine } from "@entities";

export const RoutineService = (
    repository: IRoutineRepository,
) => {
    return {
        create: async (userId: string, date: Date) => {
            const existingRoutine = await repository.findByUserAndDay(userId, date);
            if (existingRoutine) {
                return existingRoutine
            }
            return await repository.save(createRoutine(userId, date));
        }
    }




}