"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routineMapper = void 0;
exports.routineMapper = {
    toResponse: (routine) => {
        return {
            id: routine.id,
            date: routine.date,
            userId: routine.userId,
            routineStatus: routine.routineStatus,
            totalTasks: routine.totalTasks,
            completedTasks: routine.completedTasks,
            completionRate: routine.completionRate,
            starEarned: routine.starEarned,
            xpEarned: routine.xpEarned,
        };
    }
    /*  toPrismaRoutineCreateInput: (routine: RoutineDomain): Prisma.RoutineCreateInput => {
         return {
             userId: routine.userId,
             routineStatus: routine.routineStatus,
             totalTasks: routine.totalTasks,
             completedTasks: routine.completedTasks,
             completionRate: routine.completionRate,
             starEarned: routine.starEarned,
             xpEarned: routine.xpEarned,
         }
     } */
};
