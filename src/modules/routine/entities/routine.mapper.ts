import type { RoutineDomain, RoutineModel, RoutineResponse, RoutineStatus } from "@types";
import { Routine, Task } from "src/generated/prisma";
import { taskMapper } from "./task.mapper";

export const routineMapper = {
    toResponse: (routine: Routine & { tasks?: Task[] }): RoutineResponse => {
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
            tasks: routine.tasks?.map(task => taskMapper.toDomain(task, routine.userId))
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