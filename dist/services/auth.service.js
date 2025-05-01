"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_validation_1 = require("../validations/auth.validation");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
class AuthService {
    async updateProfile(userId, body) {
        const { name, city, state, instagram, twitter, twitch, favoritePlayer, favoriteGame, birthDate, avatarUrl, } = body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                city,
                state,
                instagram,
                twitter,
                twitch,
                favoritePlayer,
                favoriteGame,
                birthDate,
                avatarUrl, // ✅ agora sim
            },
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                state: true,
                instagram: true,
                twitter: true,
                twitch: true,
                favoritePlayer: true,
                favoriteGame: true,
                birthDate: true,
                updatedAt: true,
                avatarUrl: true,
            },
        });
        return updatedUser;
    }
    async register(data) {
        const validatedData = auth_validation_1.registerSchema.parse(data);
        const { name, email, password, birthDate, city, state, instagram, twitter, twitch, favoritePlayer, favoriteGame, } = validatedData;
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            throw new Error("Usuário já registrado com esse email.");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                birthDate,
                city,
                state,
                instagram,
                twitter,
                twitch,
                favoritePlayer,
                favoriteGame,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        return user;
    }
    async login(data) {
        const validatedData = auth_validation_1.loginSchema.parse(data);
        const { email, password } = validatedData;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Email ou senha inválidos.");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email ou senha inválidos.");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return token;
    }
}
exports.AuthService = AuthService;
