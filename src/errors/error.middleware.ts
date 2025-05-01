import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof ZodError) {
		res.status(400).json({
			error: {
				message: err.errors[0].message,
				statusCode: 400,
			},
		});
		return;
	}

	const statusCode = err.statusCode || 400;

	res.status(statusCode).json({
		error: {
			message: err.message || "Algo deu errado.",
			statusCode: statusCode,
		},
	});
	return;
};
