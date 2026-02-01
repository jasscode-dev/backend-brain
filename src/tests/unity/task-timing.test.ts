import {
    jest,
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
} from "@jest/globals";

import { Status, Category, type TaskCreated } from "@types";
import { startTask, pauseTask, doneTask } from "@entities";
import { v4 as uuid } from "uuid";

describe("Task Timing Logic", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-01-01T08:00:00.000Z"));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const createMockTask = (): TaskCreated => ({
        id: uuid(),
        content: "Test task",
        status: Status.CREATED, // corrigido
        timeInit: "08:00",
        timeEnd: "09:00",
        totalSeconds: 0,
        duration: 60 * 60, // 1h
        startedAt: null,
        category: "WORK" as Category,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    it("should accumulate time correctly across multiple pauses", () => {
        let state = createMockTask();

        // Start #1
        state = { ...state, ...startTask(state) };

        expect(state.status).toBe(Status.PENDING);
        expect(state.startedAt).toEqual(new Date("2026-01-01T08:00:00.000Z"));

        // +10 minutes
        jest.advanceTimersByTime(10 * 60 * 1000);

        // Pause #1
        state = { ...state, ...pauseTask(state) };

        expect(state.status).toBe(Status.PAUSED);
        expect(state.totalSeconds).toBe(600);
        expect(state.startedAt).toBeNull();

        // Start #2
        state = { ...state, ...startTask(state) };

        // +15 minutes
        jest.advanceTimersByTime(15 * 60 * 1000);

        // Done
        state = { ...state, ...doneTask(state) };

        expect(state.status).toBe(Status.DONE);
        expect(state.totalSeconds).toBe(1500);
        expect(state.totalSeconds).toBeLessThanOrEqual(state.duration);
    });

    it("should accumulate time over many short pauses", () => {
        let state = createMockTask();

        for (let i = 0; i < 3; i++) {
            state = { ...state, ...startTask(state) };
            jest.advanceTimersByTime(5 * 60 * 1000); // 5 min
            state = { ...state, ...pauseTask(state) };
        }

        expect(state.totalSeconds).toBe(900); // 15 min total
        expect(state.status).toBe(Status.PAUSED);
    });

    it("should throw error when pausing a task that was never started", () => {
        const task = createMockTask();
        expect(() => pauseTask(task)).toThrow("Task is not started");
    });

    it("should throw error when completing a task that was never started", () => {
        const task = createMockTask();
        expect(() => doneTask(task)).toThrow("Task is not started");
    });
});
