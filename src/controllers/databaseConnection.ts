import prisma from "../prisma/client";

export default async function databaseConnection(fastify) {
    try {
        await prisma.$connect();
        fastify.log.info("Database connection established");
    } catch (error) {
        fastify.log.error(error);
        throw error;
    }
}