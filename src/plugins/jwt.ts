import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'supersecret',
    cookie: {
      cookieName: 'token', // must match when setting cookie
      signed: false,
    },
  });

  fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!request) return reply.status(401).send({ message: 'Unauthorized' });
      await request.jwtVerify(); 
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });
});

export default jwtPlugin;
