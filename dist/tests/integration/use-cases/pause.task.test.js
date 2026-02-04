"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const Services_1 = require("src/modules/tasks/Services");
const _types_1 = require("@types");
describe("Pause Task Use Case", () => {
    const mockTaskInitial = {
        id: "1",
        content: "Test task",
        status: _types_1.Status.PENDING,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: _types_1.Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockTaskPending = {
        id: "1",
        content: "Test task",
        status: _types_1.Status.PENDING,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: _types_1.Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockTaskDone = {
        id: "1",
        content: "Test task",
        status: _types_1.Status.DONE,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: _types_1.Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockTaskPaused = {
        id: "1",
        content: "Test task",
        status: _types_1.Status.PAUSED,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: new Date(),
        category: _types_1.Category.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    let repository = (0, repositories_1.InMemoryTaskRepository)([mockTaskInitial]);
    it("should pause a task", async () => {
        const task = await (0, Services_1.pauseTaskUseCase)("1", repository);
        expect(task.status).toBe(_types_1.Status.PAUSED);
    });
    it("should not  pause a task if it is not started", async () => {
        repository = (0, repositories_1.InMemoryTaskRepository)([mockTaskPaused]);
        expect(() => (0, Services_1.pauseTaskUseCase)("1", repository)).rejects.toThrow("Task is not started");
    });
});
