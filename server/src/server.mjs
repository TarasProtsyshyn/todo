import http from "http";
import dotenv from "dotenv";

import app from './app.mjs'

dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
