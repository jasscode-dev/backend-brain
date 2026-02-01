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
    it('should not create a task with content less than 2 characters', async () => {
        const response = await request(server).post('/api/task').send({
            content: 'I',
            timeInit: '09:00',
            timeEnd: '10:00',
            category: 'WORK',
        });
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.code).toBe('VALIDATION_ERROR');
    });

    it('Should not create a task with invalide category', async () => {
        const response = await request(server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '10:00',
            category: 'INVALID',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.code).toBe('VALIDATION_ERROR');
        expect(response.body.details).toContainEqual({
            message: 'Invalid category',
        });
    })
    it('Should not create a task with timeInit and timeEnd invalid format', async () => {
        const response = await request(server).post('/api/task').send({
            content: 'Test task',
            timeInit: '09:00',
            timeEnd: '1000',
            category: 'WORK',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.code).toBe('VALIDATION_ERROR');
        expect(response.body.details).toContainEqual({
            message: 'Invalid time format',
        });
    })
})