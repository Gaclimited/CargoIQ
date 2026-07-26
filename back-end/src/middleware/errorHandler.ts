import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "A record with this value already exists.",
            });
        }
        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Requested record was not found.",
            });
        }
        return res.status(400).json({
            success: false,
            message: "Database request error.",
        });
    }

    if (err instanceof Error && err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid or malformed token.",
        });
    }
    if (err instanceof Error && err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token has expired. Please log in again.",
        });
    }

    console.error("Unexpected error:", err);
    return res.status(500).json({
        success: false,
        message:
            env.NODE_ENV === "production"
                ? "Internal server error."
                : err instanceof Error
                    ? err.message
                    : "Internal server error.",
    });
}

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found.`,
    });
}