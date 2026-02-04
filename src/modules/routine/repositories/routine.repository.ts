import { prisma } from "@prisma";
import type { IRoutineRepository } from "./interfaces/routine.interface";
import type { RoutineResponse, RoutineDomain } from "@types";
import { routineMapper } from "../entities/routine.mapper";

export const RoutineRepository: IRoutineRepository = {
    async save(routine: RoutineDomain): Promise<RoutineResponse> {
        const created = await prisma.routine.create({
            data: routineMapper.toPrismaCreate(routine)
        })
        return routineMapper.toResponse(created)
    },
    async findByUserAndDay(userId: string, date: Date): Promise<RoutineResponse | null> {

        const routine = await prisma.routine.findFirst({
            where: { userId, date }
        })
        return routine ? routineMapper.toResponse(routine) : null;
    },
    async findAllByUser(userId: string): Promise<RoutineResponse[]> {
        const routines = await prisma.routine.findMany({
            where: { userId }
        })
        return routines.map(routineMapper.toResponse)
    },
}