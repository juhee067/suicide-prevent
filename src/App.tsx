import React, { useCallback, useEffect } from "react";
import Intro from "./components/LetterContent";
import Attachment from "./pages/Guestbook";
import Snap from "./pages/Snap";
import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route, useLocation, Location } from "react-router-dom";
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
        <Route path={"/main"} element={<Main />} />
        <Route path={"/letter"} element={<Letter />} />
        <Route path={"/test"} element={<Test />} />
        <Route path={"/information"} element={<Information />} />
      </Routes>
    </ThemeProvider>
  );
});

export default React.memo(App);
