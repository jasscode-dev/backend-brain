import { number } from "zod";

export type TaskDomain = {
    content: string;
    status: Status;
    timeInit: string;
    timeEnd: string;
    totalSeconds: number;
    duration: number;
    startedAt: Date | null;
    category: Category;

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
export type TaskCreated = {
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
export type ToggleTaskType = {
    status: Status,
    startedAt: Date | null,
    duration: number,
    totalSeconds: number,

}

export type Category = keyof typeof Category;

