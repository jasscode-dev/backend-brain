import type { Task, ToggleTaskType } from "@types";

export interface ITaskRepository {
    save(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, task: ToggleTaskType): Promise<Task | null>;
    remove(id: string): Promise<void>;
}
