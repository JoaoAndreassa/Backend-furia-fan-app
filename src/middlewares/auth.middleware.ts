import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
	userId?: string;
}

export function authenticateToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		res.status(401).json({ message: "Token não enviado." });
		return;
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Token inválido." });
		return;
	}

	try {
		const payload = jwt.verify(token, JWT_SECRET) as { id: string };
		req.userId = payload.id;
		next();
	} catch (error) {
		res.status(403).json({ message: "Token inválido ou expirado." });
	}
}
