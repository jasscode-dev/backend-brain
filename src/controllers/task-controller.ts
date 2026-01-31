import type { RequestHandler } from "express";
import { registerTask } from "@use-cases";
import { TaskRepository } from "@repositories";
import { TaskSchema } from "@schemas";


export const createTaskController: RequestHandler = async (req, res) => {

    const { content, timeInit, timeEnd, category } = req.body

    const validation = TaskSchema.safeParse({ content, timeInit, timeEnd, category });


    if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
    }

    try {
        const newTask = await registerTask(validation.data, TaskRepository)
        return res.status(201).json(newTask)
    } catch (error) {
        return res.status(400).json({ error: "Error in create task" })
    }


}