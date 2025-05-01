import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório."),
	email: z.string().email("Email inválido."),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
	birthDate: z
		.string()
		.optional()
		.refine(
			(date) => {
				if (!date) return true; // se não for obrigatório, passa
				const parsed = Date.parse(date);
				return !isNaN(parsed);
			},
			{
				message: "Data de nascimento inválida. Use o formato AAAA-MM-DD.",
			}
		),
	city: z.string().optional(),
	state: z.string().optional(),
	instagram: z.string().optional(),
	twitter: z.string().optional(),
	twitch: z.string().optional(),
	favoritePlayer: z.string().optional(),
	favoriteGame: z.string().optional(),
});
export const loginSchema = z.object({
	email: z.string().email("Email inválido."),
	password: z
		.string()
		.min(6, "Senha é obrigatória e precisa ter pelo menos 6 caracteres."),
});
