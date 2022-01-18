import { tasks, defaultTask } from "./tasks.mongo.mjs";

export const getAllTasks = () => {
  return tasks;
};

export const addNewTask = (task) => {
  const newTask = { ...defaultTask, ...task, createdAt: new Date().getTime() };

  tasks.push(newTask);

  return newTask;
};
