import { TaskController } from "@tasks/controllers";
import { TaskRepository } from "src/modules/routine/repositories";
import { RoutineRepository } from "src/modules/routine/repositories";

export const taskController = TaskController(
    TaskRepository,
    RoutineRepository
);