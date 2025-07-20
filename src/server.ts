import fastify from "fastify";
import userRoutes from "./routes/user";
import databaseConnection from "./controllers/databaseConnection";
import { authRoutes } from "./routes/auth.route";
import fastifyJwt from "@fastify/jwt";
import dotenv from 'dotenv';

dotenv.config();
const app = fastify({ logger: true });

databaseConnection(app);
app.register(fastifyJwt, {
  secret: process.env.JWT_ACCESS_TOKEN_SECRET
})
app.register(userRoutes, {prefix: "api/v1"});
app.register(authRoutes, {prefix: "api/v1"});
app.get("/", async () => {
  return { hello: "world" };
});



const start = async () => {
  try {
    const address = await app.listen({ port: 3000 });
    app.log.info(`Server listening at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
