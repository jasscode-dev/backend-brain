"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskMapper = void 0;
exports.taskMapper = {
    toPrismaCreate: (task) => ({
        content: task.content,
        routineId: task.routineId,
        plannedStart: task.plannedStart,
        plannedEnd: task.plannedEnd,
        category: task.category,
        durationSec: task.durationSec,
    }),
    toDomain: (prismaTask) => ({
        id: prismaTask.id,
        content: prismaTask.content,
        plannedStart: prismaTask.plannedStart,
        plannedEnd: prismaTask.plannedEnd,
        status: prismaTask.status,
        category: prismaTask.category,
        routineId: prismaTask.routineId,
        durationSec: prismaTask.durationSec,
    }),
};
