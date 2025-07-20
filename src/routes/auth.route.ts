import { FastifyInstance } from "fastify";
import { loginUser } from "../middlewares/login.middleware";

export const authRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/login', {schema: {
        body: {
            type: 'object',
            required: ['email'],
            properties: {
                email: { type: 'string', format: 'email' },
            },
        }}, handler: loginUser});
}