"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório."),
    email: zod_1.z.string().email("Email inválido."),
    password: zod_1.z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
    birthDate: zod_1.z
        .string()
        .optional()
        .refine((date) => {
        if (!date)
            return true; // se não for obrigatório, passa
        const parsed = Date.parse(date);
        return !isNaN(parsed);
    }, {
        message: "Data de nascimento inválida. Use o formato AAAA-MM-DD.",
    }),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    instagram: zod_1.z.string().optional(),
    twitter: zod_1.z.string().optional(),
    twitch: zod_1.z.string().optional(),
    favoritePlayer: zod_1.z.string().optional(),
    favoriteGame: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido."),
    password: zod_1.z
        .string()
        .min(6, "Senha é obrigatória e precisa ter pelo menos 6 caracteres."),
});
