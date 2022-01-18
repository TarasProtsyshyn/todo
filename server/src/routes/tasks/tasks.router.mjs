import express from "express";

import { httpGetAllTasks, httpNewAddTask, httpEditTask } from "./tasks.controller.mjs";

const tasksRouter = express.Router();

tasksRouter.get("/", httpGetAllTasks);
tasksRouter.post("/", httpNewAddTask);
tasksRouter.patch("/", httpEditTask);

export default tasksRouter;
