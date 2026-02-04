"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
describe('Task Routes', () => {
    it('should create a task', async () => {
        const response = await (0, supertest_1.default)(server_1.server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '10:00',
            category: 'WORK',
        });
        expect(response.status).toBe(201);
    });
    it('should not create a task', async () => {
        const response = await (0, supertest_1.default)(server_1.server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '08:00',
            category: 'WORK',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Time init must be less than time end');
    });
});
