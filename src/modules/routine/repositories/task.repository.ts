import type { TaskModel, TaskDomain, TaskResponse, ToggleTaskType, StatusTask } from "@types";
import type { ITaskRepository } from "./interfaces/task.interface";
import { prisma } from "@prisma";
import { taskMapper } from "@entities";





export const TaskRepository: ITaskRepository = {
    async save(task: TaskDomain): Promise<TaskResponse> {
        const created = await prisma.task.create({
            data: taskMapper.toPrismaCreate(task)
        });
        return taskMapper.toDomain(created);
    },



    async update(id: string, task: Partial<TaskDomain>): Promise<TaskResponse> {
        const updated = await prisma.task.update({
            where: { id },
            data: taskMapper.toPrismaUpdate(task)
        });
        return taskMapper.toDomain(updated);
    },



    async findById(id: string): Promise<TaskResponse | null> {
        const task = await prisma.task.findUnique({
            where: { id }
        });
        if (!task) return null;
        return taskMapper.toDomain(task);
    },
    async findAll(): Promise<TaskResponse[]> {
        const tasks = await prisma.task.findMany();
        return tasks.map(taskMapper.toDomain);
    },

};
