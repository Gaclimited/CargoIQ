import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";

export function protect(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Missing or invalid authorization header.", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        next(err);
    }
}