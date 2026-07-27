import { GoogleGenAI } from "@google/genai";
import { env } from "./env";

// Singleton Gemini client, reused across requests.
export const genAI = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});

export const GEMINI_MODEL = "gemini-3.6-flash";