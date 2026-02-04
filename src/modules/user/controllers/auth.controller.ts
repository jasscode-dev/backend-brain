import { RequestHandler } from "express"

export const loginController: RequestHandler = (req, res) => {
    return res.status(200).json({ message: "Login" })
}

export const registerController: RequestHandler = (req, res) => {
    return res.status(200).json({ message: "Register" })
}