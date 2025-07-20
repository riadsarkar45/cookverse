import { FastifyInstance } from 'fastify';
import { addNewRecipe, allUsers, getAllRecipes } from '../middlewares/user.middleware';

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

  fastify.post('/new-recipe', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'description', 'instructions'],
        properties: {
          title: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 },
          instructions: { type: 'string', minLength: 1 },
        },
      }
    }, handler: addNewRecipe
  })  

  fastify.get('/recipes',{ preHandler: fastify.authenticate }, getAllRecipes)
}
