import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/jwt";
import { RegisterInput, LoginInput } from "../types/auth.types";

const SALT_ROUNDS = 10;

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (existingUser) {
        throw new AppError("An account with this email already exists.", 409);
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
        },
    });

    const token = signToken({ id: user.id, email: user.email });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
}

export async function loginUser(input: LoginInput) {
    const user = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (!user) {
        throw new AppError("Invalid email or password.", 401);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password.", 401);
    }

    const token = signToken({ id: user.id, email: user.email });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
}