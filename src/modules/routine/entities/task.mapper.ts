
import type { TaskDomain, TaskResponse } from "@types";
import { Task as PrismaTask } from "src/generated/prisma";

export const taskMapper = {
    toPrismaCreate: (task: TaskDomain) => ({
        content: task.content,
        routineId: task.routineId,
        plannedStart: task.plannedStart,
        plannedEnd: task.plannedEnd,
        category: task.category,
        durationSec: task.durationSec,
    }),
    toPrismaUpdate: (task: Partial<TaskDomain>) => ({
        content: task.content,
        status: task.status,
        startedAt: task.startedAt,
        finishedAt: task.finishedAt,
        totalSeconds: task.totalSeconds,
        actualDurationSec: task.actualDurationSec,
    }),
    toDomain: (prismaTask: PrismaTask): TaskResponse => ({
        id: prismaTask.id,
        content: prismaTask.content,
        plannedStart: prismaTask.plannedStart,
        plannedEnd: prismaTask.plannedEnd,
        status: prismaTask.status,
        category: prismaTask.category,
        routineId: prismaTask.routineId,
        durationSec: prismaTask.durationSec,
    }),
} 