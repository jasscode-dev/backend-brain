import type { RoutineDomain, RoutineModel, RoutineResponse, RoutineStatus } from "@types";
import { Routine } from "src/generated/prisma";

export const routineMapper = {
    toResponse: (routine: Routine): RoutineResponse => {
        return {
            id: routine.id,
            date: routine.date,
            userId: routine.userId,
            routineStatus: routine.routineStatus as RoutineStatus,
            totalTasks: routine.totalTasks,
            completedTasks: routine.completedTasks,
            completionRate: routine.completionRate,
            starEarned: routine.starEarned,
            xpEarned: routine.xpEarned,

        }
    },
    toDomain: (routine: Routine): RoutineResponse => {
        return routineMapper.toResponse(routine)
    },
    toPrismaCreate: (routine: RoutineDomain) => {
        return {
            userId: routine.userId,
            date: routine.date
        }
    }
}