import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await authService.register(req.body);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const token = await authService.login(req.body);
			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	}

	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = (req as any).userId;

			const updatedUser = await authService.updateProfile(userId, req.body);

			res.status(200).json(updatedUser);
		} catch (error) {
			console.error("❌ Erro ao atualizar perfil:", error);
			next(error);
		}
	}
}
