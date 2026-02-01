import { z } from "zod";


const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const TaskSchema = z.object({
    content: z.string().min(2, { message: "Content must have at least 2 characters" }),
    timeInit: z.string().regex(regexTime, { message: "Invalid time format" }),
    timeEnd: z.string().regex(regexTime, { message: "Invalid time format" }),
    category: z.enum(
        ["STUDY", "WORK", "PERSONAL", "BREAK"],
        {
            error: () => ({
                message: "Invalid category"
            })
        }
    )


})

export type TaskSchemaType = z.infer<typeof TaskSchema>;
