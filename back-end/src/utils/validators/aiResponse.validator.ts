import { z } from "zod";

const triStateSchema = z
    .enum(["true", "false", "uncertain"])
    .transform((val): boolean | "uncertain" =>
        val === "uncertain" ? "uncertain" : val === "true"
    );

export const aiResponseSchema = z.object({
    productType: z.string().min(1),
    mainMaterials: z.array(z.string()).default([]),
    electronics: triStateSchema,
    batteryPresent: triStateSchema,
    wireless: triStateSchema,
    possibleHsCode: z.string().min(1),
    importDuty: z.string().min(1),
    vat: z.string().min(1),
    requiredDocuments: z.array(z.string()).default([]),
    countryRegulations: z.string().min(1),
    aiSuggestions: z.string().min(1),
    confidenceNotes: z.string().optional(),
});

export type ValidatedAiResponse = z.infer<typeof aiResponseSchema>;