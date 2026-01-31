import type { RequestHandler } from "express";
import { registerTask } from "@use-cases";
import { TaskRepository } from "@repositories";


export const createTaskController: RequestHandler = (req, res) => {

    const { content, timeInit, timeEnd, category } = req.body
    console.log(req.body)

    try {
        const newTask = registerTask({ content, timeInit, timeEnd, category }, TaskRepository)
        return res.status(201).json(newTask)
    } catch (error) {
        return res.status(400).json({ error: "Error in create task" })
    }


}