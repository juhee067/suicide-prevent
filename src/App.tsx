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
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Post from "./pages/Post";
import PostDetail from "./components/Post/PostDetail";
import BoardWriting from "./pages/BoardWriting";

const App = React.memo(() => {
  const routes = [
    { path: "/", element: <Main /> },
    { path: "/letter", element: <Letter /> },
    { path: "/test", element: <Test /> },
    { path: "/information", element: <Information /> },
    { path: "/post", element: <Post /> },
    { path: "/auth/signUp", element: <SignUp /> },
    { path: "/auth/signIn", element: <SignIn /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Nav />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/post/:idx" element={<PostDetail />} />
        <Route path="/BoardForm" element={<BoardWriting />} />
      </Routes>
    </ThemeProvider>
  );
});

export default React.memo(App);
