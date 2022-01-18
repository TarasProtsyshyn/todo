import tasks from "./tasks.mongo.mjs";

export const getAllTasks = async () => {
  return await tasks.find({});
};

export const addNewTask = async (task) => {
  const newTask = await tasks.create({ ...task });

  return newTask;
};

export const editTask = async (task) => {
  await tasks.findByIdAndUpdate(task.id, { content: task.content });
  const editedTask = await tasks.findById(task.id);

  return editedTask;
};

export const deleteTask = async (id) => {
  await tasks.findByIdAndDelete(id);
};
