import type { TaskCreated, TaskDomain, ToggleTaskType } from "@types";
import type { ITaskRepository } from "./interfaces/task-interface";
import { prisma } from "@prisma";
import { toDomainTask, toPrismaTaskCreate } from "../entities/task-mapper";




export const TaskRepository: ITaskRepository = {
    async save(task: TaskDomain): Promise<TaskCreated> {
        const created = await prisma.task.create({
            data: toPrismaTaskCreate(task)
        });

        return toDomainTask(created);
    },

    async findAll(): Promise<TaskCreated[]> {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return tasks.map(toDomainTask);
    },

    async findById(id: string): Promise<TaskCreated | null> {
        const task = await prisma.task.findUnique({
            where: { id }
        });
        if (!task) return null;
        return toDomainTask(task);
    },
    async findByStatus(status: string): Promise<TaskCreated | null> {
        const task = await prisma.task.findFirst({
            where: { status }
        });
        return task ? toDomainTask(task) : null;
    },
    async update(id: string, data: Partial<TaskDomain>): Promise<TaskCreated> {
        const updated = await prisma.task.update({
            where: { id },
            data: {
                status: data.status,
                startedAt: data.startedAt,
                duration: data.duration,
                totalSeconds: data.totalSeconds,

            }
        });

        return toDomainTask(updated);
    },

    async remove(id: string): Promise<void> {
        await prisma.task.delete({
            where: { id }
        });
    }

};
