import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Home, CreatePage } from "./pages";
import { NavBar } from "./components";

const App = () => {
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
};

export default App;
