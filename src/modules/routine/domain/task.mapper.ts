

export const taskMapper = {
    toPrismaCreate: (task: TaskDomain) => ({
        content: task.content,
        routineId: task.routineId,
        plannedStart: task.plannedStart,
        plannedEnd: task.plannedEnd,
        category: task.category,
        durationSec: task.durationSec,
    }),
    toPrismaUpdate: (task: Partial<TaskDomai>) => ({
        content: task.content,
        statust: task.status ,
        startedAt: task.startedAt,
        finishedAt: task.finishedAt,
        cancelledAt: task.cancelledAt,
        totalSeconds: task.totalSeconds,
        actualDurationSec: task.actualDurationSec,
    }),
    toDomain: (prismaTask: PrismaTask & { routine?: { userId: string } }, userId?: string): TaskResponse => {
        const finalUserId = userId || prismaTask.routine?.userId;

        if (!finalUserId) {
            throw new Error("Task userId or routine relation is required to map to domain");
        }

        return {
            id: prismaTask.id,
            userId: finalUserId,
            content: prismaTask.content,
            plannedStart: prismaTask.plannedStart,
            plannedEnd: prismaTask.plannedEnd,
            status: prismaTask.status,
            category: prismaTask.category,
            routineId: prismaTask.routineId,
            durationSec: prismaTask.durationSec,
            startedAt: prismaTask.startedAt,
            finishedAt: prismaTask.finishedAt,
            cancelledAt: prismaTask.cancelledAt,
            totalSeconds: prismaTask.totalSeconds,
            actualDurationSec: prismaTask.actualDurationSec,
        }
    },

} 