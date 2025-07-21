import fastify from "fastify";
import userRoutes from "./routes/user";
import databaseConnection from "./controllers/databaseConnection";
import { authRoutes } from "./routes/auth.route";
import dotenv from 'dotenv';
import jwtPlugin from "./plugins/jwt";

dotenv.config();
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
app.register(userRoutes, {prefix: "api/v1"});
app.register(authRoutes, {prefix: "api/v1"});

app.get("/", async () => {
  return { hello: "world" };
});



const start = async () => {
  try {
    const address = await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
