import express from "express";

import { httpGetAllTasks, httpNewAddTask } from "./tasks.controller.mjs";

const tasksRouter = express.Router();

tasksRouter.get("/", httpGetAllTasks);
tasksRouter.post("/", httpNewAddTask);

export default tasksRouter;
