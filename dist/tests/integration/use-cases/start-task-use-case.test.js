"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _types_1 = require("@types");
const Services_1 = require("src/modules/tasks/Services");
const in_memory_repository_1 = require("../repositories/in.memory.repository");
(0, globals_1.describe)("Start Task Use Case", () => {
    const mockTaskInitial = {
        id: "1",
        content: "Test task",
        status: _types_1.Status.CREATED,
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60,
        startedAt: null,
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
    let repository = (0, in_memory_repository_1.InMemoryTaskRepository)([mockTaskInitial]);
    (0, globals_1.it)("should start a task", async () => {
        const task = await (0, Services_1.startTaskUseCase)("1", repository);
        (0, globals_1.expect)(task.status).toBe(_types_1.Status.PENDING);
        (0, globals_1.expect)(task.startedAt).not.toBeNull();
    });
    (0, globals_1.it)("should throw error when task is not found", async () => {
        (0, globals_1.expect)(() => (0, Services_1.startTaskUseCase)("2", repository)).rejects.toThrow("Task not found");
    });
    (0, globals_1.it)("should throw error when task is already done", async () => {
        repository = (0, in_memory_repository_1.InMemoryTaskRepository)([mockTaskDone]);
        (0, globals_1.expect)(() => (0, Services_1.startTaskUseCase)("1", repository)).rejects.toThrow("Task is already done");
    });
    (0, globals_1.it)("should start a task that is paused", async () => {
        repository = (0, in_memory_repository_1.InMemoryTaskRepository)([mockTaskPaused]);
        const task = await (0, Services_1.startTaskUseCase)("1", repository);
        (0, globals_1.expect)(task.status).toBe(_types_1.Status.PENDING);
        (0, globals_1.expect)(task.startedAt).not.toBeNull();
    });
    (0, globals_1.it)("should throw error when task is already running", async () => {
        repository = (0, in_memory_repository_1.InMemoryTaskRepository)([mockTaskPending]);
        (0, globals_1.expect)(() => (0, Services_1.startTaskUseCase)("1", repository)).rejects.toThrow("There is already an active task");
    });
});
