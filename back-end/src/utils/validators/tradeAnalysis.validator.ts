import { z } from "zod";

export const createTradeAnalysisSchema = z.object({
    body: z.object({
        originCountry: z
            .string({ required_error: "Origin country is required" })
            .trim()
            .min(2, "Origin country must be at least 2 characters long"),
        destinationCountry: z
            .string({ required_error: "Destination country is required" })
            .trim()
            .min(2, "Destination country must be at least 2 characters long"),
        productName: z
            .string({ required_error: "Product name is required" })
            .trim()
            .min(2, "Product name must be at least 2 characters long"),
        category: z
            .string({ required_error: "Category is required" })
            .trim()
            .min(2, "Category must be at least 2 characters long"),
        value: z
            .number({ required_error: "Product value is required" })
            .positive("Product value must be greater than 0"),
        weight: z
            .number({ required_error: "Weight is required" })
            .positive("Weight must be greater than 0"),
        description: z
            .string({ required_error: "Product description is required" })
            .trim()
            .min(10, "Please provide a more detailed product description (min 10 characters)"),
    }),
});

export const getAnalysisByIdSchema = z.object({
    params: z.object({
        id: z.string({ required_error: "Analysis id is required" }).uuid("Invalid analysis id format"),
    }),
});

export const deleteAnalysisSchema = getAnalysisByIdSchema;