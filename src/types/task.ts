import { number } from "zod";

export type Task = {
    id: string;
    content: string;
    status: Status;
    timeInit: string;
    timeEnd: string;
    totalSeconds: number;
    duration: number;
    startedAt: Date | null;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}

export enum Status {
    CREATED = 'CREATED',
    PENDING = 'PENDING',
    DONE = 'DONE',
    PAUSED = 'PAUSED'
}
export type CreateTaskType = {
    content: string;
    timeInit: string;
    timeEnd: string;
    category: Category;
}
export const Category = {
    WORK: "WORK",
    PERSONAL: "PERSONAL",
    STUDY: "STUDY",
    BREAK: "BREAK"
} as const;

export type ToggleTaskType = {
    status: Status,
    startedAt: Date | null,
    duration: number,
    totalSeconds: number,
    updatedAt: Date
}

export type Category = keyof typeof Category;

export interface ITaskRepository {
    save(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, task: ToggleTaskType): Promise<Task | null>;
    remove(id: string): Promise<void>;
}
