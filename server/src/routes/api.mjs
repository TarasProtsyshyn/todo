import express from "express";

import tasksRouter from "./tasks/tasks.router.mjs";

const api = express.Router();

api.use("/tasks", tasksRouter);

export default api;
