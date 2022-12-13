import React, { useState, useEffect } from "react";
import Task from "../task/Task";
import { Box, Typography } from "@mui/material";
//import services
import api from "../../services/api";

const mapping = {
  1: "del",
  2: "imp",
  3: "com",
};

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [action, setAction] = useState("");

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
        temp.splice(idx, 1);
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

  const handleKey = (e) => {
    if (e.key === "ArrowUp") {
      setCurrent((prev) => (prev === 0 ? tasks.length - 1 : prev - 1));
    } else if (e.key === "ArrowDown") {
      setCurrent((prev) => (prev === tasks.length - 1 ? 0 : prev + 1));
    }
  };

  const actionHandler = (keyName, targetId) => {
    let actionId = action ? parseInt(action.substr(-1, 1)) : 1;
    if (keyName === "ArrowLeft") {
      actionId = actionId === 1 ? 1 : actionId - 1;
      setAction((prev) => (prev ? current + "" + actionId : targetId));
    } else if (keyName === "ArrowRight") {
      actionId = actionId === 3 ? 3 : actionId + 1;
      setAction((prev) => (prev ? current + "" + actionId : targetId));
    } else if (keyName === "Enter") {
      const taskItem = tasks[current];
      handleAction(taskItem.id, mapping[actionId]);
    } else {
      console.log("some other key pressed", keyName);
    }
  };

  const renderTasks = () => {
    return tasks.map((_each, idx) => {
      if (!_each.deleted) {
        return (
          <Box key={_each.id} className={idx === current ? "selected" : ""}>
            <Task
              data={_each}
              idx={idx}
              handleAction={handleAction}
              actionValue={action}
              actionHandler={actionHandler}
            />
          </Box>
        );
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      {tasks.length ? (
        <Box onKeyDown={handleKey}>{renderTasks()}</Box>
      ) : (
        <Typography variant="h6" component="h6">
          No Tasks available.
        </Typography>
      )}
    </Box>
  );
};

export default ViewTask;
