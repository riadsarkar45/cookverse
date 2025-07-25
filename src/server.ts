import fastify from "fastify";
import userRoutes from "./routes/recipes.routes";
import databaseConnection from "./controllers/databaseConnection";
import { authRoutes } from "./routes/auth/auth.route";
import dotenv from 'dotenv';
import jwtPlugin from "./plugins/jwt";
import fastifyCookie from "fastify-cookie";

dotenv.config({ debug: true, path: '.env' });
const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
  },
});


databaseConnection(app);
app.register(jwtPlugin)
app.register(fastifyCookie)
app.register(userRoutes, { prefix: "api/v1" });
app.register(authRoutes, { prefix: "api/v1" });

app.get("/", async () => {
  return { hello: "world" };
});



const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
