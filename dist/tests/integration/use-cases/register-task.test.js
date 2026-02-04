"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const services_1 = require("src/modules/routine/services");
const repositories_1 = require("../repositories");
(0, globals_1.describe)('Create Task', () => {
    (0, globals_1.it)('should create a new task', async () => {
        const repository = (0, repositories_1.InMemoryTaskRepository)();
        const input = {
            content: 'Task 1',
            plannedStart: new Date('2023-10-27T08:00:00Z'),
            plannedEnd: new Date('2023-10-27T09:00:00Z'),
            category: "WORK",
            userId: 'clq1234567890123456789012'
        };
        const task = await services_1.TaskService.create(input, repository);
        const savedTask = await repository.findById(task.id);
        (0, globals_1.expect)(savedTask).toBeDefined();
        (0, globals_1.expect)(savedTask?.content).toBe(input.content);
        (0, globals_1.expect)(savedTask?.status).toBe('PENDING');
    });
    (0, globals_1.it)('should throw an error if content is missing', async () => {
        const repository = (0, repositories_1.InMemoryTaskRepository)();
        const input = {
            content: 'a',
            plannedStart: new Date(),
            plannedEnd: new Date(Date.now() + 3600),
            category: "WORK",
            userId: 'clq1234567890123456789012'
        };
        await (0, globals_1.expect)(services_1.TaskService.create(input, repository)).rejects.toThrow('Content must have at least 2 characters');
    });
    (0, globals_1.it)('should throw an error if plannedEnd is before plannedStart', async () => {
        const repository = (0, repositories_1.InMemoryTaskRepository)();
        const input = {
            content: 'Task 1',
            plannedStart: new Date('2023-10-27T10:00:00Z'),
            plannedEnd: new Date('2023-10-27T07:00:00Z'),
            category: "WORK",
            userId: 'clq1234567890123456789012'
        };
        await (0, globals_1.expect)(services_1.TaskService.create(input, repository)).rejects.toThrow('PlannedEnd must be after plannedStart');
    });
});
