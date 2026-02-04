"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskPresenter = void 0;
const createTaskPresenter = (task) => {
    return {
        id: task.id,
        content: task.content,
        timeInit: task.timeInit,
        timeEnd: task.timeEnd,
        duration: task.duration,
        status: task.status,
        category: task.category,
    };
};
exports.createTaskPresenter = createTaskPresenter;
