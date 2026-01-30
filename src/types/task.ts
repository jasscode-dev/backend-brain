export type Task = {
    id: string;
    content: string;
    status: Status;
    timeInit: string;
    timeEnd: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum Status {
    CREATEAD = 'CREATEAD',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
}
export type RequestTask = {
    content: string;
    timeInit: string;
    timeEnd: string;
}

export type ITaskRepository = {
    save(task: CreateTask): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    update(id: string, status: Status): Promise<Task | null>;
    delete(id: string): Promise<void>;
}