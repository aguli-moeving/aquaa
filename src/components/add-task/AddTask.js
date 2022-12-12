import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import api from "../../services/api";

const AddTask = () => {
  const [content, setContent] = useState("");
  const [info, setInfo] = useState("");

  const handleAdd = () => {
    console.log(content);
    api
      .createTask(content)
      .then((res) => setInfo("Task was succesfully Added!"))
      .catch((err) => setInfo("Failed to add task"));
  };

  return (
    <>
      <Typography component="h2">Add Task</Typography>
      <Box sx={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          fullWidth
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Typography component="h4" sx={{ color: "red", mt: 5 }}>
        {info}
      </Typography>
    </>
  );
};

export default AddTask;
