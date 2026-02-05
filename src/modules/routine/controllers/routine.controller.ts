
import { RoutineService } from "src/modules/routine/services";
import type { Request, Response } from "express";
import { IRoutineRepository } from "@interfaces";

type IdParam = { id: string }
type UserParam = { userId: string }

export const RoutineController = (routineRepository: IRoutineRepository) => {
    const routineService = RoutineService(routineRepository)

    return {
        getAllByUser: async (req: Request<UserParam>, res: Response) => {
            const { userId } = req.params
            const routines = await routineService.findAllByUser(userId)
            return res.status(200).json(routines)
        },
        getById: async (req: Request<IdParam>, res: Response) => {
            const { id } = req.params
            const routine = await routineService.findById(id)
            return res.status(200).json(routine)
        }
    }
}
