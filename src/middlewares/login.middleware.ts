import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma/client";

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { email } = req.query as { email: string };
    if (!email) return reply.status(400).send({ message: "Please provide an email" });

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        const token = await reply.jwtSign(
            { user: user.id, name: user.name, email: user.email },
            { expiresIn: '1h' }
        );


        reply.status(200).send({ message: "User logged in successfully", user, token });
    } catch (err) {
        console.error("Error logging in user:", err);
        return reply.status(500).send({ message: "Internal server error" });
    }
};