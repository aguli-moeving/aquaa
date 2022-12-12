import React, { useState, useEffect } from "react";
import Task from "../task/Task";
import { Box, Typography } from "@mui/material";
//import services
import api from "../../services/api";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .getTasks()
      .then((res) => {
        if (res.data?.tasks.length) {
          const result = res.data.tasks.slice();
          result.forEach((element, i) => {
            element.deleted = false;
            if (!element.importance) {
              element.importance = 0;
            }
          });

          setTasks(sortTasksByImp(result));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const sortTasksByImp = (_list) => {
    const temp = _list;
    temp.sort((a, b) => {
      if (a.importance < b.importance) {
        return 1;
      }
      if (a.importance > b.importance) {
        return -1;
      }
      return 0;
    });
    return temp;
  };

  const handleAction = (id, action) => {
    const temp = tasks.slice();
    const item = temp.find((e) => e.id === id);
    switch (action) {
      case "del":
        item.deleted = true;
        handleDelete(item);
        break;
      case "imp":
        item.importance++;
        handleUpdate(item);
        break;
      case "com":
        item.complete = true;
        handleUpdate(item);
        break;
      default:
        console.log("No option selected");
        break;
    }
  };

  const handleDelete = (item) => {
    api
      .deleteTask(item.id)
      .then((res) => {
        const temp = tasks.slice();
        const idx = temp.findIndex((e) => e.id === item.id);
        delete temp[idx];
        setTasks(temp);
      })
      .catch((err) => console.error("Failed to delete the task"));
  };

  const handleUpdate = (item) => {
    api
      .updateTask(item.id, item)
      .then((res) => {
        const temp = tasks.slice();
        const idx = temp.findIndex((e) => e.id === item.id);
        temp[idx] = item;
        setTasks(sortTasksByImp(temp));
      })
      .catch((err) => console.error("failed to update task Id #", item.id));
  };

  const renderTasks = () => {
    return tasks.map((_each, idx) => {
      if (!_each.deleted) {
        return <Task data={_each} handleAction={handleAction} key={_each.id} />;
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      {tasks.length ? (
        renderTasks()
      ) : (
        <Typography variant="h6" component="h6">
          No Tasks available.
        </Typography>
      )}
    </Box>
  );
};

export default ViewTask;
