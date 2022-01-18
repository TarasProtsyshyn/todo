import tasks from "./tasks.mongo.mjs";

export const getAllTasks = async () => {
  return await tasks.find({});
};

export const addNewTask = async (task) => {
  const newTask = await tasks.create({ ...task });

  return newTask;
};
