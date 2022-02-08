import { v4 as uuidV4 } from "uuid";
import { rest } from "msw";
import queryString from "query-string";
import { taskTypes } from "../constants";

let tasks = [
  {
    id: uuidV4(),
    content: "Done task",
    isDone: true,
  },
  {
    id: uuidV4(),
    content: "not done task",
    isDone: false,
  },
  {
    id: uuidV4(),
    content: "Task for edit",
    isDone: false,
  },
  {
    id: uuidV4(),
    content: "Task for check",
    isDone: false,
  },
  {
    id: uuidV4(),
    content: "Task fro delete",
    isDone: false,
  },
];

const getTasks = (filter) => {
  switch (filter) {
    case taskTypes.ACTIVE:
      return tasks.filter((el) => !el.isDone);
    case taskTypes.COMPLETED:
      return tasks.filter((el) => el.isDone);
    default:
      return tasks;
  }
};

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {
    const search = queryString.parse(req.url.search);

    return res(ctx.json(getTasks(search.filter)));
  }),
  rest.post(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {
    const newTask = { ...req.body, isDone: false, id: uuidV4() };
    tasks.unshift(newTask);

    return res(ctx.json(newTask));
  }),

  rest.patch(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {
    let updatedTask = {};
    tasks.forEach((el, index) => {
      if (el.id === req.body.id) {
        updatedTask = { ...el, ...req.body };
        tasks[index] = updatedTask;
      }
    });

    return res(ctx.json(updatedTask));
  }),

  rest.delete(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {
    tasks = tasks.filter((el) => el.id !== req.body.id);
    return res(ctx.json({ message: "Task was successfully delete", id: req.body.id }));
  }),
];
