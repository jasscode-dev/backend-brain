import type { RoutineResponse, RoutineDomain } from "@types";

export interface IRoutineRepository {
    save(routine: RoutineDomain): Promise<RoutineResponse>;
    findByUserAndDay(userId: string, date: Date): Promise<RoutineResponse | null>;
    findAllByUser(userId: string): Promise<RoutineResponse[]>;
    findById(id: string): Promise<RoutineResponse | null>;
}