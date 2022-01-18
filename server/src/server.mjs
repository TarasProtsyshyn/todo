import http from "http";
import dotenv from "dotenv";

import app from "./app.mjs";
import { mongoConnect } from "./services/mongo.mjs";

dotenv.config();

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
  });
}

startServer();
