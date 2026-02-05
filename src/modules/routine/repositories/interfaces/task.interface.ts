import type { TaskDomain, ToggleTaskType, TaskResponse } from "@types";

export interface ITaskRepository {
    save(task: TaskDomain): Promise<TaskResponse>;
    update(id: string, task: Partial<TaskDomain>): Promise<TaskResponse>;
    findById(id: string): Promise<TaskResponse | null>;
    findAll(): Promise<TaskResponse[]>;

}
