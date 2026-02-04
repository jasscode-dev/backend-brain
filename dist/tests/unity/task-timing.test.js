"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _types_1 = require("@types");
const entities_1 = require("src/modules/routine/entities");
const uuid_1 = require("uuid");
(0, globals_1.describe)("Task Timing Logic", () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.useFakeTimers();
        globals_1.jest.setSystemTime(new Date("2026-01-01T08:00:00.000Z"));
    });
    (0, globals_1.afterEach)(() => {
        globals_1.jest.useRealTimers();
    });
    const createMockTask = () => ({
        id: (0, uuid_1.v4)(),
        content: "Test task",
        status: _types_1.Status.CREATED, // corrigido
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60, // 1h
        startedAt: null,
        category: "WORK",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    (0, globals_1.it)("should accumulate time correctly across multiple pauses", () => {
        let state = createMockTask();
        // Start #1
        state = { ...state, ...(0, entities_1.startTask)(state) };
        (0, globals_1.expect)(state.status).toBe(_types_1.Status.PENDING);
        (0, globals_1.expect)(state.startedAt).toEqual(new Date("2026-01-01T08:00:00.000Z"));
        // +10 minutes
        globals_1.jest.advanceTimersByTime(10 * 60 * 1000);
        // Pause #1
        state = { ...state, ...(0, entities_1.pauseTask)(state) };
        (0, globals_1.expect)(state.status).toBe(_types_1.Status.PAUSED);
        (0, globals_1.expect)(state.totalSeconds).toBe(600);
        (0, globals_1.expect)(state.startedAt).toBeNull();
        // Start #2
        state = { ...state, ...(0, entities_1.startTask)(state) };
        // +15 minutes
        globals_1.jest.advanceTimersByTime(15 * 60 * 1000);
        // Done
        state = { ...state, ...(0, entities_1.doneTask)(state) };
        (0, globals_1.expect)(state.status).toBe(_types_1.Status.DONE);
        (0, globals_1.expect)(state.totalSeconds).toBe(1500);
        (0, globals_1.expect)(state.totalSeconds).toBeLessThanOrEqual(state.duration);
    });
    (0, globals_1.it)("should accumulate time over many short pauses", () => {
        let state = createMockTask();
        for (let i = 0; i < 3; i++) {
            state = { ...state, ...(0, entities_1.startTask)(state) };
            globals_1.jest.advanceTimersByTime(5 * 60 * 1000); // 5 min
            state = { ...state, ...(0, entities_1.pauseTask)(state) };
        }
        (0, globals_1.expect)(state.totalSeconds).toBe(900); // 15 min total
        (0, globals_1.expect)(state.status).toBe(_types_1.Status.PAUSED);
    });
    (0, globals_1.it)("should throw error when pausing a task that was never started", () => {
        const task = createMockTask();
        (0, globals_1.expect)(() => (0, entities_1.pauseTask)(task)).toThrow("Task is not started");
    });
    (0, globals_1.it)("should throw error when completing a task that was never started", () => {
        const task = createMockTask();
        (0, globals_1.expect)(() => (0, entities_1.doneTask)(task)).toThrow("Task is not started");
    });
});
