"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
const prisma = new client_1.PrismaClient();
// Rotas públicas
router.post("/register", (req, res, next) => authController.register(req, res, next));
router.post("/login", (req, res, next) => authController.login(req, res, next));
// Rota protegida: buscar dados do usuário logado
router.get("/profile", auth_middleware_1.authenticateToken, async (req, res) => {
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
    }
    catch (error) {
        console.error("❌ Erro no GET /profile:", error);
        res.status(500).json({ message: "Erro ao buscar perfil." });
    }
});
// PATCH do perfil usando o AuthController
router.patch("/profile", auth_middleware_1.authenticateToken, (req, res, next) => {
    console.log("📩 PATCH /profile recebido");
    authController.updateProfile(req, res, next);
});
exports.default = router;
