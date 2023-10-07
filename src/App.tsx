import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { Container, MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  return (
    <MantineProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
};

export default App;
