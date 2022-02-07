import api from "./api";

export const getTasksApi = async ({ params }) => {
  return await api.get({ path: "v1/tasks", params });
};

export const addTaskApi = async ({ body }) => {
  return await api.post({ path: "v1/tasks", body });
};

export const editTaskApi = async ({ body }) => {
  return await api.patch({ path: "v1/tasks", body });
};

export const deleteTaskApi = async ({ body }) => {
  return await api.delete({ path: "v1/tasks", body });
};
