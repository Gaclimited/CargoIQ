import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import {
    createTradeAnalysis,
    getUserTradeAnalyses,
    getTradeAnalysisById,
    deleteTradeAnalysis,
} from "../services/tradeAnalysis.service";

export const analyze = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Unauthorized.", 401);
    }

    const analysis = await createTradeAnalysis(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Product analyzed successfully.",
        data: analysis,
    });
});

export const getAllAnalyses = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Unauthorized.", 401);
    }

    const analyses = await getUserTradeAnalyses(req.user.id);

    res.status(200).json({
        success: true,
        data: analyses,
    });
});

export const getAnalysisById = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Unauthorized.", 401);
    }

    const analysis = await getTradeAnalysisById(req.user.id, req.params.id);

    res.status(200).json({
        success: true,
        data: analysis,
    });
});

export const removeAnalysis = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Unauthorized.", 401);
    }

    const result = await deleteTradeAnalysis(req.user.id, req.params.id);

    res.status(200).json({
        success: true,
        message: "Trade analysis deleted successfully.",
        data: result,
    });
});
