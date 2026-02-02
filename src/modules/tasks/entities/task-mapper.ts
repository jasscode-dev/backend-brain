import { Status, Category } from "@types";
import type { TaskDomain, TaskCreated } from "@types";
import type { Prisma } from "@prisma/client";

export const toPrismaTaskCreate = (task: TaskDomain): Prisma.TaskCreateInput => ({
    content: task.content,
    timeInit: task.timeInit,
    timeEnd: task.timeEnd,
    totalSeconds: task.totalSeconds,
    status: task.status,
    startedAt: task.startedAt,
    duration: task.duration,
    category: task.category
});

export const toDomainTask = (prismaTask: any): TaskCreated => ({
    id: prismaTask.id,
    content: prismaTask.content,
    timeInit: prismaTask.timeInit,
    timeEnd: prismaTask.timeEnd,
    totalSeconds: prismaTask.totalSeconds,
    status: prismaTask.status as Status,
    startedAt: prismaTask.startedAt,
    duration: prismaTask.duration,
    category: prismaTask.category as Category,
    createdAt: prismaTask.createdAt,
    updatedAt: prismaTask.updatedAt
});