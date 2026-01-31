
import { InMemoryTaskRepository } from "../tests/ports/in-memory-user-repository";
import { registerTask } from "./register-task";
import { Category, Status } from "../types";

describe('Create Task', () => {
    it('should create a new task', async () => {
        const repository = InMemoryTaskRepository()

        const input = { content: 'Task 1', timeInit: '08:00', timeEnd: '09:00', category: Category.WORK }
        const task = await registerTask(input, repository)

        const savedTask = await repository.findById(task.id)


        expect(savedTask).toBeDefined()
        expect(savedTask?.content).toBe(input.content)
        expect(savedTask?.timeInit).toBe(input.timeInit)
        expect(savedTask?.timeEnd).toBe(input.timeEnd)
        expect(savedTask?.status).toBe(Status.CREATEAD)
    })

    it('should throw an error if task already exists', async () => {
        const repository = InMemoryTaskRepository([
            {
                id: "1", content: 'Task 1', timeInit: '08:00',
                timeEnd: '09:00', category: 'WORK', totalMinutes: 60,
                createdAt: new Date(), updatedAt: new Date(), status: Status.CREATEAD
            }
        ])

        const input = { content: 'Task 1', timeInit: '08:00', timeEnd: '09:00', category: 'WORK' as Category }


        await expect(registerTask(input, repository)).rejects.toThrow("Task already exists");

    })


    it('should throw an error if content is missing', async () => {
        const repository = InMemoryTaskRepository()
        const input = { content: 'a', timeInit: '07:00', timeEnd: '08:00', category: Category.WORK }

        expect(registerTask(input, repository)).rejects.toThrow('Content must have at least 2 characters');





    })
    it('should throw an error if timeEnd is before timeInit', async () => {
        const repository = InMemoryTaskRepository()
        const input = { content: 'Task 1', timeInit: '10:00', timeEnd: '07:00', category: Category.WORK }

        expect(registerTask(input, repository)).rejects.toThrow('End time must be after start time');





    })





})  