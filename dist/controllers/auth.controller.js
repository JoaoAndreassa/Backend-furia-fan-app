"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const token = await authService.login(req.body);
            res.status(200).json({ token });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const userId = req.userId;
            const updatedUser = await authService.updateProfile(userId, req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            console.error("❌ Erro ao atualizar perfil:", error);
            next(error);
        }
    }
}
exports.AuthController = AuthController;
