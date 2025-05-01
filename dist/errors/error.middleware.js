"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
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
exports.errorMiddleware = errorMiddleware;
