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
  const routes = [
    { path: "/", element: <Main /> },
    { path: "/letter", element: <Letter /> },
    { path: "/test", element: <Test /> },
    { path: "/information", element: <Information /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Nav />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </ThemeProvider>
  );
});

export default React.memo(App);
