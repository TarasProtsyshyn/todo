import { getAllTasks, addNewTask } from "../../models/tasks/tasks.models.mjs";

export async function httpGetAllTasks(req, res) {
  return res.json(await getAllTasks());
}

export async function httpNewAddTask(req, res) {
  const task = req.body;

  if (!task?.content?.trim()) {
    return res.status(400).json({
      error: "Task can't be empty!",
    });
  }

  const newTask = await addNewTask(task);

  return res.json(newTask);
}
