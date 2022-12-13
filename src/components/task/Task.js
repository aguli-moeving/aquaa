import React from "react";
import { Card, Box, CardContent, IconButton } from "@mui/material";
import {
  DeleteOutline,
  ArrowUpward,
  CheckCircleOutlineSharp,
} from "@mui/icons-material";

const Task = ({ data, idx, handleAction, actionValue, actionHandler }) => {
  return (
    <Card sx={{ display: "flex", mb: 1 }}>
      <CardContent sx={{ flexGrow: 1 }}>{data.description}</CardContent>
      <Box sx={{ display: "flex" }}>
        <IconButton
          id={idx + "1"}
          aria-label="delete"
          onClick={() => handleAction(data.id, "del")}
          disableRipple={true}
          className={actionValue === idx + "1" ? "selected-action" : ""}
          onKeyDown={(e) => actionHandler(e.key, e.target.id)}
        >
          <DeleteOutline sx={{ color: "#DC143C" }} />
        </IconButton>

        <IconButton
          id={idx + "2"}
          aria-label="increase importance"
          onClick={() => handleAction(data.id, "imp")}
          disableRipple={true}
          className={actionValue === idx + "2" ? "selected-action" : ""}
          onKeyDown={(e) => {
            actionHandler(e.key, e.target.id);
          }}
        >
          <ArrowUpward />
        </IconButton>

        <IconButton
          id={idx + "3"}
          aria-label="Mark as completed"
          onClick={() => handleAction(data.id, "com")}
          disableRipple={true}
          className={actionValue === idx + "3" ? "selected-action" : ""}
          onKeyDown={(e) => actionHandler(e.key, e.target.id)}
        >
          <CheckCircleOutlineSharp
            sx={{ color: data.complete ? "green" : "black" }}
          />
        </IconButton>
      </Box>
    </Card>
  );
};

export default Task;
