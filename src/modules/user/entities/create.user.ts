import { CreateUserType } from "@types";
import { AppError } from "@errors";

export const createUser = (input: CreateUserType) => {

    if (!input.name || input.name.trim().length < 2) {
        throw new AppError("Name must have at least 2 characters", 400)
    }
    if (!input.email || input.email.trim().length < 2) {
        throw new AppError("Email must have at least 2 characters", 400)
    }
    if (!input.password || input.password.trim().length < 2) {
        throw new AppError("Password must have at least 2 characters", 400)
    }
    return Object.freeze({
        name: input.name,
        email: input.email,
        password: input.password,
        level: 1,
        xp: 0,
        stars: 0,
        visualRepresentation: 0,
        routines: [],
        createdAt: new Date(),
    })
}