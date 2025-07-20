import fastify from "fastify";
import userRoutes from "./routes/user";
import databaseConnection from "./controllers/databaseConnection";

const app = fastify({ logger: true });

databaseConnection(app);

app.register(userRoutes, {prefix: "api/v1"});
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
