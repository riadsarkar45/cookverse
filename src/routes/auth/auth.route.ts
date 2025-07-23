import { FastifyInstance } from "fastify";
import { loginUser } from "../../middlewares/login.middleware";
import { allUsers } from "../../middlewares/user.middleware";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' },
        },
      }
    }, handler: loginUser
  });

  fastify.post('/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password' },
        },
      },
    },
    handler: allUsers,
  });
}