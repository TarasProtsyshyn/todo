import express from "express";
import cors from "cors";
import morgan from "morgan";

import api from "./routes/api.mjs";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello Back-end");
});

app.use("/v1", api);

export default app;
