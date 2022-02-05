import { getAllTasks, addNewTask, editTask, deleteTask } from "../../models/tasks/tasks.models.mjs";
import { getTaskFilter } from "../../services/query.mjs";

export async function httpGetAllTasks(req, res) {
  const filterBy = getTaskFilter(req.query);

  return res.json(await getAllTasks(filterBy));
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

export async function httpEditTask(req, res) {
  const task = req.body;

  const newTask = await editTask(task);

  return res.json(newTask);
}

export async function httpDeleteTask(req, res) {
  await deleteTask(req.body.id);

  return res.json({ message: "Task was successfully delete", id: req.body.id });
}
