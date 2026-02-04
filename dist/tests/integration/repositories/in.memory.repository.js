"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTaskRepository = void 0;
const InMemoryTaskRepository = (initialTasks = []) => {
    const tasks = [...initialTasks];
    return {
        async findById(id) {
            return tasks.find(t => t.id === id) ?? null;
        },
        async findByStatus(status) {
            return tasks.find(t => t.status === status) ?? null;
        },
        async save(task) {
            const created = {
                ...task,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            tasks.push(created);
            return created;
        },
        async update(id, data) {
            const task = await this.findById(id);
            if (!task)
                throw new Error("Not found");
            Object.assign(task, data, { updatedAt: new Date() });
            return task;
        },
        async findAll() {
            return tasks;
        },
        async remove(id) {
            tasks.filter(t => t.id !== id);
        }
    };
};
exports.InMemoryTaskRepository = InMemoryTaskRepository;
