import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { analyzeProductWithAI } from "./ai.service";
import { CreateTradeAnalysisInput } from "../types/tradeAnalysis.types";

export async function createTradeAnalysis(
    userId: string,
    input: CreateTradeAnalysisInput
) {
    const aiResponse = await analyzeProductWithAI(input);

    const analysis = await prisma.tradeAnalysis.create({
        data: {
            userId,
            originCountry: input.originCountry,
            destinationCountry: input.destinationCountry,
            productName: input.productName,
            category: input.category,
            value: input.value,
            weight: input.weight,
            description: input.description,
            aiResponse: aiResponse as unknown as object,
        },
    });

    return analysis;
}

export async function getUserTradeAnalyses(userId: string) {
    return prisma.tradeAnalysis.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}

export async function getTradeAnalysisById(userId: string, analysisId: string) {
    const analysis = await prisma.tradeAnalysis.findUnique({
        where: { id: analysisId },
    });

    if (!analysis) {
        throw new AppError("Trade analysis not found.", 404);
    }

    if (analysis.userId !== userId) {
        throw new AppError("You are not authorized to access this analysis.", 403);
    }

    return analysis;
}

export async function deleteTradeAnalysis(userId: string, analysisId: string) {
    const analysis = await prisma.tradeAnalysis.findUnique({
        where: { id: analysisId },
    });

    if (!analysis) {
        throw new AppError("Trade analysis not found.", 404);
    }

    if (analysis.userId !== userId) {
        throw new AppError("You are not authorized to delete this analysis.", 403);
    }

    await prisma.tradeAnalysis.delete({ where: { id: analysisId } });

    return { id: analysisId };
}
