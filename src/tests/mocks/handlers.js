import { rest } from "msw";

const tasks = [
  {
    id: "61fedbf1c29706b32d9bfe6b",
    content: "test task",
    isDone: true,
  },
  {
    id: "61fedc1bc29706b32d9bfe6e",
    content: "test task 1",
    isDone: false,
  },
  {
    id: "61fee59a55e984a07f722f8e",
    content: "test task 2",
    isDone: false,
  },
  {
    id: "61fee59d55e984a07f722f90",
    content: "test task 3",
    isDone: false,
  },
  {
    id: "61fee5a255e984a07f722f92",
    content: "test task 4",
    isDone: false,
  },
];

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {

    return res(ctx.json(tasks));
  }),
];
