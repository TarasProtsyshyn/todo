import express from "express";

import api from "./routes/api.mjs";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Back-end");
});

app.use("/v1", api);

export default app;
