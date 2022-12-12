import React from "react";
import { Card, Box, CardContent, IconButton } from "@mui/material";
import {
  DeleteOutline,
  ArrowUpward,
  CheckCircleOutlineSharp,
} from "@mui/icons-material";

const Task = ({ data, handleAction }) => {
  return (
    <Card sx={{ display: "flex", mb: 1 }}>
      <CardContent sx={{ flexGrow: 1 }}>{data.description}</CardContent>
      <Box sx={{ display: "flex" }}>
        <IconButton
          aria-label="delete"
          onClick={() => handleAction(data.id, "del")}
        >
          <DeleteOutline sx={{ color: "#DC143C" }} />
        </IconButton>

        <IconButton
          aria-label="increase importance"
          onClick={() => handleAction(data.id, "imp")}
        >
          <ArrowUpward />
        </IconButton>

        <IconButton
          aria-label="Mark as completed"
          onClick={() => handleAction(data.id, "com")}
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
