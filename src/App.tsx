import React from "react";

import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/nav/Nav";
import Test from "./pages/Test";
import Information from "./pages/Information";
import Letter from "./pages/Letter";

const App = React.memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <MobileNav /> */}
      <Nav />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/letter"} element={<Letter />} />
        <Route path={"/test"} element={<Test />} />
        <Route path={"/information"} element={<Information />} />
      </Routes>
    </ThemeProvider>
  );
});

export default React.memo(App);
