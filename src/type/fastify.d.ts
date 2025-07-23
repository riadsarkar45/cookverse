import '@fastify/jwt';
import 'fastify';

declare module 'fastify' {
  
  

  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
    };
  }
}
