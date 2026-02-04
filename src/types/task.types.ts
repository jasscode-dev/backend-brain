
export type StatusTask = "PENDING" | "INPROGRESS" | "DONE" | "PAUSED";
export type Category = "WORK" | "PERSONAL" | "STUDY" | "BREAK";




export type TaskInput = {
    userId: string;
    content: string;
    plannedStart: Date;
    plannedEnd: Date;
    category: Category;
}


export type TaskDomain = TaskInput & {
    routineId: string;
    status: StatusTask;
    durationSec: number;
    totalSeconds: number;
    startedAt: Date | null;
    finishedAt: Date | null;
}


export type TaskResponse = {
    id: string;
    content: string;
    routineId: string;
    category: Category;
    plannedStart: Date;
    plannedEnd: Date;
    durationSec: number;
    status: StatusTask;
}


export type TaskModel = {
    id: string;
    routineId: string;
    content: string;
    status: StatusTask;
    plannedStart: Date;
    plannedEnd: Date;
    durationSec: number;
    totalSeconds: number;
    startedAt: Date | null;
    finishedAt: Date | null;
    actualDurationSec: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}


export type ToggleTaskType = {
    status: StatusTask;
    startedAt: Date | null;
    durationSec: number
    totalSeconds: number;
}
