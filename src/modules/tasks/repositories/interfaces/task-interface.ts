import type { TaskDomain, ToggleTaskType, TaskCreated } from "@types";

export interface ITaskRepository {
    save(task: TaskDomain): Promise<TaskCreated>;
    findAll(): Promise<TaskCreated[]>;
    findById(id: string): Promise<TaskCreated | null>;
    update(id: string, task: ToggleTaskType): Promise<TaskCreated>;
    remove(id: string): Promise<void>;
    findByStatus(status: string): Promise<TaskCreated | null>;
}
