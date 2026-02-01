import { describe, it, expect } from "@jest/globals"
import { Category, Status } from "@types"
import { startTaskUseCase } from "../../../use-cases/task/start-task-use-case"
import { InMemoryTaskRepository } from "../repositories/in-memory-user-repository"

describe("Start Task Use Case", () => {
    const mockTaskInitial = {
        id: "1",
        content: "Test task",
        status: Status.CREATED,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: null,
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
    it("should start a task", async () => {

        const task = await startTaskUseCase("1", repository)
        expect(task.status).toBe(Status.PENDING)
        expect(task.startedAt).not.toBeNull()
    })
    it("should throw error when task is not found", async () => {
        expect(() => startTaskUseCase("2", repository)).rejects.toThrow("Task not found")
    })
    it("should throw error when task is already running", async () => {
        repository = InMemoryTaskRepository([mockTaskPending])
        expect(() => startTaskUseCase("1", repository)).rejects.toThrow("Task is already running")
    })
    it("should throw error when task is already done", async () => {
        repository = InMemoryTaskRepository([mockTaskDone])
        expect(() => startTaskUseCase("1", repository)).rejects.toThrow("Task is already done")
    })
    it("should start a task that is paused", async () => {
        repository = InMemoryTaskRepository([mockTaskPaused])
        const task = await startTaskUseCase("1", repository)
        expect(task.status).toBe(Status.PENDING)
        expect(task.startedAt).not.toBeNull()
    })

})