"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineRepository = void 0;
const _prisma_1 = require("@prisma");
const routine_mapper_1 = require("../entities/routine.mapper");
exports.RoutineRepository = {
    async save(routine) {
        throw new Error("Method not implemented.");
    },
    async findByUserAndDate(userId, date) {
        const routine = await _prisma_1.prisma.routine.findFirst({
            where: {
                userId,
                date
            }
        });
        return routine ? routine_mapper_1.routineMapper.toResponse(routine) : null;
    },
    async findAll() {
        throw new Error("Method not implemented.");
    },
    async findById(id) {
        throw new Error("Method not implemented.");
    },
    async update(id, routine) {
        throw new Error("Method not implemented.");
    },
    async remove(id) {
        throw new Error("Method not implemented.");
    }
};
