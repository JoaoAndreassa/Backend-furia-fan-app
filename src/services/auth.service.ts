import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
	async updateProfile(userId: any, body: any) {
		const {
			name,
			city,
			state,
			instagram,
			twitter,
			twitch,
			favoritePlayer,
			favoriteGame,
			birthDate,
			avatarUrl, 
		  } = body;

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

	async register(data: any) {
		const validatedData = registerSchema.parse(data);

		const {
			name,
			email,
			password,
			birthDate,
			city,
			state,
			instagram,
			twitter,
			twitch,
			favoritePlayer,
			favoriteGame,
		} = validatedData;

		const userExists = await prisma.user.findUnique({ where: { email } });
		if (userExists) {
			throw new Error("Usuário já registrado com esse email.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

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

	async login(data: any) {
		const validatedData = loginSchema.parse(data);
		const { email, password } = validatedData;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			throw new Error("Email ou senha inválidos.");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Email ou senha inválidos.");
		}

		const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

		return token;
	}
}
