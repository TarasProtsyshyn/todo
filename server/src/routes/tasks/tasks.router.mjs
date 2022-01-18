import express from "express";

import { httpGetAllTasks, httpNewAddTask, httpEditTask, httpDeleteTask } from "./tasks.controller.mjs";

const tasksRouter = express.Router();

tasksRouter.get("/", httpGetAllTasks);
tasksRouter.post("/", httpNewAddTask);
tasksRouter.patch("/", httpEditTask);
tasksRouter.delete("/", httpDeleteTask);

export default tasksRouter;
