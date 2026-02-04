"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const _prisma_1 = require("@prisma");
const _entities_1 = require("@entities");
exports.TaskRepository = {
    async save(task) {
        const created = await _prisma_1.prisma.task.create({
            data: _entities_1.taskMapper.toPrismaCreate(task)
        });
        return _entities_1.taskMapper.toDomain(created);
    },
    async findAll() {
        const tasks = await _prisma_1.prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return tasks.map(_entities_1.taskMapper.toDomain);
    },
    async findById(id) {
        const task = await _prisma_1.prisma.task.findUnique({
            where: { id }
        });
        if (!task)
            return null;
        return _entities_1.taskMapper.toDomain(task);
    },
    async findByStatus(status) {
        const task = await _prisma_1.prisma.task.findFirst({
            where: { status }
        });
        return task ? _entities_1.taskMapper.toDomain(task) : null;
    },
    async update(id, data) {
        const updated = await _prisma_1.prisma.task.update({
            where: { id },
            data: {
                status: data.status,
                startedAt: data.startedAt,
                durationSec: data.durationSec,
                totalSeconds: data.totalSeconds,
            }
        });
        return _entities_1.taskMapper.toDomain(updated);
    },
    async remove(id) {
        await _prisma_1.prisma.task.delete({
            where: { id }
        });
    }
};
