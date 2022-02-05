import tasks from "./tasks.mongo.mjs";

export const getAllTasks = async (filterBy = {}) => {
  return await tasks.find(filterBy).sort({ createdAt: -1 });
};

export const addNewTask = async (task) => {
  const newTask = await tasks.create({ ...task });

  return newTask;
};

export const editTask = async (task) => {
  await tasks.findByIdAndUpdate(task.id, { content: task.content, isDone: task.isDone });
  const editedTask = await tasks.findById(task.id);

  return editedTask;
};

export const deleteTask = async (id) => {
  await tasks.findByIdAndDelete(id);
};
