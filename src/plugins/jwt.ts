import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'supersecret',
  });

  fastify.decorate('authenticate', async function (req, reply) {
    try {
      await req.jwtVerify();
      
      fastify.log.info({user: req.user.name}, 'JWT verified successfully');
      console.log('JWT verified successfully', {user: req.user.name});
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized you fucked up!' });
      throw err;
    }
  });
});
