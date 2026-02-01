import type { Task, ToggleTaskType } from "@types";
import type { ITaskRepository } from "@interfaces";


export const TaskRepository: ITaskRepository = {

    save(task) {
        return Promise.resolve(task);
    },
    findAll: function (): Promise<Task[]> {
        throw new Error("Function not implemented.");
    },
    findById: function (id: string): Promise<Task | null> {
        throw new Error("Function not implemented.");
    },
    update: function (id: string, task: ToggleTaskType): Promise<Task | null> {
        throw new Error("Function not implemented.");
    },
    remove: function (id: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
} 
