import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma/client";
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password)
        return reply.status(400).send({ message: "Please provide both email and password" });

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return reply.status(401).send({ message: "Invalid credentials." });

        const refreshToken = uuidV4();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
        const sessionId = uuidV4();

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken,
                userAgent: req.headers['user-agent'] || 'unknown',
                ip: req.ip,
                expiresAt,
            },
        });

        const token = await reply.jwtSign(
            {
                userId: user.id,
                sessionId,
            },
            { expiresIn: '15m' }
        );

        return reply
            .setCookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15, // 15 minutes in seconds
            })
            .send({ message: "Login successful", token });

    } catch (err) {
        console.error("Error logging in user:", err);
        return reply.status(500).send({ message: "Internal server error" });
    }
};
