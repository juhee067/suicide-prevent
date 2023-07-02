import React from "react";
import Intro from "./pages/Intro";
import Attachment from "./pages/Attachment";
import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={"/"} element={<Intro />} />
        </Routes>
        <Routes>
          <Route path={"/attachment"} element={<Attachment />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
