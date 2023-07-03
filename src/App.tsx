import React from "react";
import Intro from "./pages/Intro";
import Attachment from "./pages/Attachment";
import Snap from "./pages/Snap";
import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path={"/"} element={<Intro />} />
      </Routes>
      <Routes>
        <Route path={"/attachment"} element={<Attachment />} />
      </Routes>
      <Routes>
        <Route path={"/snap"} element={<Snap />} />
      </Routes>
      <Routes>
        <Route path={"/Main"} element={<Main />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
