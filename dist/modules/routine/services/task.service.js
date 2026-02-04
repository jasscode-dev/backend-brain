"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const _entities_1 = require("@entities");
const routine_service_1 = require("./routine.service");
const routine_repository_1 = require("../repositories/routine.repository");
exports.TaskService = {
    create: async (input, repository) => {
        const date = new Date(input.plannedStart);
        date.setHours(0, 0, 0, 0);
        const routine = await (0, routine_service_1.createRoutineService)(routine_repository_1.RoutineRepository, input.userId, date);
        const task = _entities_1.taskDomain.create(input, routine.id);
        const newTask = await repository.save(task);
        return newTask;
    },
    /*  start: async (id: string, repository: ITaskRepository) => {
         const task = await TaskService.findById(repository, id)
         const existing = await repository.findByStatus(Status.PENDING)
         if (existing) {
             throw new AppError("There is already an active task", 400)
         }
         const updatedTask = await repository.update(id, taskDomain.start(task))
         return updatedTask
     },
     pause: async (id: string, repository: ITaskRepository) => {
         const task = await TaskService.findById(repository, id)
 
         const updatedTask = await repository.update(id, pauseTask(task))
         return updatedTask
     },
     findAll: async (repository: ITaskRepository): Promise<TaskResponse[]> => {
         return await repository.findAll()
 
     },
     findById: async (repository: ITaskRepository, id: string): Promise<TaskModel> => {
         const task = await repository.findById(id);
         if (!task) {
             throw new AppError("Task not found", 404)
         }
         return task
     },
 
     done: async (id: string, repository: ITaskRepository) => {
         const task = await TaskService.findById(repository, id)
         const updatedTask = await repository.update(id, doneTask(task))
         return updatedTask
     }, */
};
/* xport const createTaskService = async (input: CreateTaskType, repository: ITaskRepository) => {
    const newTask = await repository.save(createTask(input))
    return newTask


}

export const startTaskService = async (id: string, repository: ITaskRepository) => {
    const task = await findByIdTaskService(repository, id)
    const existing = await repository.findByStatus(Status.PENDING)
    if (existing) {
        throw new AppError("There is already an active task", 400)
    }
    const updatedTask = await repository.update(id, startTask(task))
    return updatedTask
}



export const pauseTaskService = async (id: string, repository: ITaskRepository) => {
    const task = await findByIdTaskService(repository, id)

    const updatedTask = await repository.update(id, pauseTask(task))
    return updatedTask
}

export const findAllTaskService = async (repository: ITaskRepository): Promise<TaskModel[]> => {
    return await repository.findAll()

}
export const findByIdTaskService = async (repository: ITaskRepository, id: string): Promise<TaskModel> => {
    const task = await repository.findById(id);
    if (!task) {
        throw new AppError("Task not found", 404)
    }
    return task
}

export const doneTaskService = async (id: string, repository: ITaskRepository) => {
    const task = await findByIdTaskService(repository, id)
    const updatedTask = await repository.update(id, doneTask(task))
    return updatedTask
} */ 
