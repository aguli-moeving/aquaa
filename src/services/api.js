import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000/",
});

const api = {
  getTasks: () => {
    return server.get("api/tasks");
  },
  createTask: (content) => {
    return server.post("api/tasks", {
      task: {
        description: content,
        complete: false,
      },
    });
  },
  updateTask: (id, data) => {
    return server.put(`api/tasks/${id}`, {
      task: {
        ...data,
      },
    });
  },
  deleteTask: (id) => {
    return server.delete(`api/tasks/${id}`);
  },
};

export default api;
