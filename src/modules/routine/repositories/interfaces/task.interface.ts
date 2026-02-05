import type { TaskDomain, ToggleTaskType, TaskResponse } from "@types";

export interface ITaskRepository {
    save(task: TaskDomain): Promise<TaskResponse>;
    update(id: string, task: TaskDomain): Promise<TaskResponse>;
    findById(id: string): Promise<TaskResponse | null>;
    delete(id: string): Promise<void>;
    findAll(): Promise<TaskResponse[]>;

}
