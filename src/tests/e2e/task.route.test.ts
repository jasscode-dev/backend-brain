import request from 'supertest';
import { server } from '../../server';

describe('Task Routes', () => {
    it('should create a task', async () => {
        const response = await request(server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '10:00',
            category: 'WORK',
        });
        expect(response.status).toBe(201);
    });
    it('should not create a task', async () => {
        const response = await request(server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '08:00',
            category: 'WORK',
        });
        expect(response.status).toBe(400);
    });
});