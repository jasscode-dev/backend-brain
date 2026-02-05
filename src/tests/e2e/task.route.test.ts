import request from 'supertest';
import { server } from '../../server';
import { prisma } from '@prisma';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "@jest/globals";



describe('Task Routes (E2E)', () => {
    let testUserId: string;

    beforeAll(async () => {
        // Create a test user
        const user = await prisma.user.create({
            data: {
                name: 'Test User',
                email: `test-${Date.now()}@example.com`,
                password: 'password123'
            }
        });
        testUserId = user.id;
    });

    afterAll(async () => {
        // Cleanup: order matters due to foreign keys
        await prisma.task.deleteMany();
        await prisma.routine.deleteMany();
        await prisma.user.delete({ where: { id: testUserId } });
        await prisma.$disconnect();
    });

    it('should create a task', async () => {
        const payload = {
            userId: testUserId,
            content: 'E2E Task',
            plannedStart: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            plannedEnd: new Date(Date.now() + 7200000).toISOString(),   // 2 hours from now
            category: 'WORK'
        };

        const response = await request(server)
            .post('/api/task')
            .send(payload);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.content).toBe(payload.content);
        expect(response.body.userId).toBe(testUserId);
    });

    it('should get all tasks', async () => {
        const response = await request(server)
            .get('/api/task');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    describe('Task lifecycle', () => {
        let taskId: string;

        beforeEach(async () => {
            const task = await request(server)
                .post('/api/task')
                .send({
                    userId: testUserId,
                    content: 'Lifecycle Task',
                    plannedStart: new Date().toISOString(),
                    plannedEnd: new Date(Date.now() + 3600000).toISOString(),
                    category: 'STUDY'
                });
            taskId = task.body.id;
        });

        it('should start a task', async () => {
            const response = await request(server)
                .post(`/api/task/${taskId}/start`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('INPROGRESS');
            expect(response.body.startedAt).toBeDefined();
        });

        it('should pause a task', async () => {
            // First start it
            await request(server).post(`/api/task/${taskId}/start`);

            const response = await request(server)
                .post(`/api/task/${taskId}/pause`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('PAUSED');
        });

        it('should complete a task', async () => {
            const response = await request(server)
                .post(`/api/task/${taskId}/done`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('DONE');
            expect(response.body.finishedAt).toBeDefined();
        });

        it('should delete a task', async () => {
            const response = await request(server)
                .delete(`/api/task/${taskId}`);

            expect(response.status).toBe(204);

            const findResponse = await prisma.task.findUnique({ where: { id: taskId } });
            expect(findResponse).toBeNull();
        });
    });

    it('should return 400 when validation fails (invalid dates)', async () => {
        const response = await request(server)
            .post('/api/task')
            .send({
                userId: testUserId,
                content: 'Invalid Task',
                plannedStart: new Date(Date.now() + 3600000).toISOString(),
                plannedEnd: new Date(Date.now()).toISOString(), // End before start
                category: 'WORK'
            });

        expect(response.status).toBe(400);
    });
});
