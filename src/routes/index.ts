import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken, AuthRequest } from "../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";

const router = Router();
const authController = new AuthController();
const prisma = new PrismaClient();

// Rotas públicas
router.post("/register", (req, res, next) =>
	authController.register(req, res, next)
);
router.post("/login", (req, res, next) => authController.login(req, res, next));

// Rota protegida: buscar dados do usuário logado
router.get(
	"/profile",
	authenticateToken,
	async (req: AuthRequest, res): Promise<void> => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: req.userId },
				select: {
          id: true,
          name: true,
          email: true,
          birthDate: true,
          city: true,
          state: true,
          instagram: true,
          twitter: true,
          twitch: true,
          favoritePlayer: true,
          favoriteGame: true,
          avatarUrl: true, // 👈 aqui
        }
			});

			if (!user) {
				console.log("❌ Usuário não encontrado no banco.");
				res.status(404).json({ message: "Usuário não encontrado." });
				return;
			}

			console.log("✅ Perfil carregado:", user);
			res.json(user);
		} catch (error) {
			console.error("❌ Erro no GET /profile:", error);
			res.status(500).json({ message: "Erro ao buscar perfil." });
		}
	}
);

// PATCH do perfil usando o AuthController
router.patch("/profile", authenticateToken, (req, res, next) => {
	console.log("📩 PATCH /profile recebido");
	authController.updateProfile(req, res, next);
});

export default router;
