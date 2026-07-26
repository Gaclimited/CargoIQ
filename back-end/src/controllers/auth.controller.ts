import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { registerUser, loginUser } from "../services/auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
    const result = await registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
    });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Logged in successfully.",
        data: result,
    });
});