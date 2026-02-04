import { RoutineDomain, RoutineResponse } from "@types";
import { IRoutineRepository } from "@interfaces";


export const InMemoryRoutineRepository = (initialRoutine: RoutineResponse[]): IRoutineRepository => {
    const routines: RoutineResponse[] = [...initialRoutine]
    return {
        async save(routine: RoutineDomain): Promise<RoutineResponse> {
            const created: RoutineResponse = {
                id: crypto.randomUUID(),
                routineStatus: 'PENDING',
                completionRate: 0,
                starEarned: false,
                xpEarned: 0,
                ...routine,
            }
            routines.push(created)
            return created
        },

        async findByUserAndDay(userId: string, date: Date): Promise<RoutineResponse | null> {
            return routines.find(r => r.userId === userId && r.date.getTime() === date.getTime()) ?? null
        },
        async findAllByUser(userId: string): Promise<RoutineResponse[]> {
            return routines.filter(r => r.userId === userId)
        },


    }
}