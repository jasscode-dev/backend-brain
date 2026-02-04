"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutineService = void 0;
const _entities_1 = require("@entities");
const createRoutineService = async (repository, userId, date) => {
    const existingRoutine = await repository.findByUserAndDay(userId, date); // verifico se ja existe uma rotina para o usuario na data de hoje
    if (existingRoutine) {
        return existingRoutine;
    }
    return await repository.save((0, _entities_1.createRoutine)(userId)); // crio a rotina
};
exports.createRoutineService = createRoutineService;
