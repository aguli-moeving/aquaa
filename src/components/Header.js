import React from "react";
import { Box, AppBar, Typography } from "@mui/material";

const AddTask = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, p: 2 }}>
          TO DOs App
        </Typography>
      </AppBar>
    </Box>
  );
};

export default AddTask;
