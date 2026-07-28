import dotenv from "dotenv";

dotenv.config();

function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const env = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: requireEnv("DATABASE_URL"),
    JWT_SECRET: requireEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    GEMINI_API_KEY: requireEnv("GEMINI_API_KEY"),
    // Optional. Defaults to enabled. Set to "false" to disable Google Search
    // Grounding (e.g. if your Gemini API tier/quota doesn't support it) without
    // any code changes — analysis will silently fall back to standard AI-only mode.
    ENABLE_SEARCH_GROUNDING: process.env.ENABLE_SEARCH_GROUNDING !== "false",
};