import { AuthPayload } from "./auth.types";

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthPayload;
    }
}

export { };