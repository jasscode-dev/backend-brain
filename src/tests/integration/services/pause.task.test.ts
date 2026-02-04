import { InMemoryTaskRepository } from "../repositories"
import { pauseTaskUseCase } from "src/modules/tasks/Services"
import { Category, Status } from "@types"


describe("Pause Task Use Case", () => {
    const mockTaskInitial = {
        id: "1",
        content: "Test task",
        status: Status.PENDING,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const mockTaskPending = {
        id: "1",
        content: "Test task",
        status: Status.PENDING,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const mockTaskDone = {
        id: "1",
        content: "Test task",
        status: Status.DONE,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const mockTaskPaused = {
        id: "1",
        content: "Test task",
        status: Status.PAUSED,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    let repository = InMemoryTaskRepository([mockTaskInitial])
    it("should pause a task", async () => {
        const task = await pauseTaskUseCase("1", repository)
        expect(task.status).toBe(Status.PAUSED)

    })
    it("should not  pause a task if it is not started", async () => {
        repository = InMemoryTaskRepository([mockTaskPaused])
        expect(() => pauseTaskUseCase("1", repository)).rejects.toThrow("Task is not started")
    })
})