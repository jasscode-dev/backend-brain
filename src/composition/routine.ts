
import { RoutineController } from "src/modules/routine/controllers";
import { RoutineRepository } from "src/modules/routine/repositories";

export const routineController = RoutineController(RoutineRepository);
