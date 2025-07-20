import { FastifyInstance } from 'fastify';
import { allUsers } from '../middlewares/users';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
        },
      },
    },
    handler: allUsers,
  });
}
