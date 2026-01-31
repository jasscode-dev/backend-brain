export type Task = {
    id: string;
    content: string;
    status: Status;
    timeInit: string;
    timeEnd: string;
    totalMinutes: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}

export enum Status {
    CREATEAD = 'CREATEAD',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
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

export type Category = "WORK" | "PERSONAL" | "STUDY" | "BREAK"

export interface ITaskRepository {
    save(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, status: Status): Promise<Task | null>;
    remove(id: string): Promise<void>;
}
