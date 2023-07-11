import React from "react";
import Intro from "./pages/Intro";
import Attachment from "./pages/Attachment";
import Snap from "./pages/Snap";
import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/nav/Nav";
import Test from "./pages/Test";
import Information from "./pages/Information";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <MobileNav /> */}
      <Nav />
      <Routes>
        <Route path={"/"} element={<Intro />} />
        <Route path={"/attachment"} element={<Attachment />} />
      </Routes>
      <Routes>
        <Route path={"/snap"} element={<Snap />} />
      </Routes>
      <Routes>
        <Route path={"/main"} element={<Main />} />
      </Routes>
      <Routes>
        <Route path={"/test"} element={<Test />} />
      </Routes>
      <Routes>
        <Route path={"/information"} element={<Information />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
