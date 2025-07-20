import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma/client"

export const allUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, email } = req.body as { name: string; email: string };

        if (!name || !email) return reply.status(400).send({ message: "Please fill all the fields" });

        const isEmailExist = await prisma.user.findUnique(

            {
                where: {
                    email: email
                }
            }
        )
        if (isEmailExist) {
            return reply.status(400).send({ message: "Email already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                name: name, email: email
            }
        })

        return reply.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}