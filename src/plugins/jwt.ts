import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'supersecret',
    cookie: {
      cookieName: 'token', // must match when setting cookie
      signed: false,
    },
  });

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify(); 
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });
});

export default jwtPlugin;
