import React, { useState } from "react";
import {
  Box,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
// import components
import Header from "./components/Header";
import AddTask from "./components/add-task/AddTask";
import ViewTask from "./components/view-task/ViewTask";

function App() {
  const [showAdd, setShowAdd] = useState(0);

  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>
        {showAdd ? <AddTask /> : <ViewTask />}
        <Box sx={{ width: 500, display: "flex", alignItems: "center" }}>
          <BottomNavigation
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              mt: 5,
              position: "fixed",
              bottom: 0,
              minWidth: 300,
            }}
            showLabels
            value={showAdd}
            onChange={(event, newValue) => {
              console.log(newValue);
              setShowAdd(newValue);
            }}
          >
            <BottomNavigationAction label="All Tasks" icon={<ListIcon />} />
            <BottomNavigationAction label="Add" icon={<AddIcon />} />
          </BottomNavigation>
        </Box>
      </Container>
    </>
  );
}

export default App;
