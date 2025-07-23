import 'fastify';
import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest  {
    jwtVerify(): Promise<void>;
    user: {
      id: number;
      name: string;
      email: string;
      role?: string;
    };
  }

  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: import('fastify').FastifyReply) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
      role?: string;
    };
  }
}
