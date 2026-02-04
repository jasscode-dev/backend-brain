"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const loginController = (req, res) => {
    return res.status(200).json({ message: "Login" });
};
exports.loginController = loginController;
const registerController = (req, res) => {
    return res.status(200).json({ message: "Register" });
};
exports.registerController = registerController;
