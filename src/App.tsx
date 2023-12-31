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
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import EditPost from "./components/Post/content/EditPost";
import Chatting from "./pages/Chatting";

const routes = [
  { path: "/", element: <Main /> },
  { path: "/letter", element: <Letter /> },
  { path: "/test", element: <Test /> },
  { path: "/information", element: <Information /> },
  { path: "/post", element: <Post /> },
  { path: "/Chatting", element: <Chatting /> },
  { path: "/auth/signUp", element: <SignUp /> },
  { path: "/auth/signIn", element: <SignIn /> },
];

const Menu = (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
    <Route path="/post/:postId" element={<PostDetail />} />
    <Route path="/PostCreate" element={<PostCreate />} />
    <Route path="/post/edit/:postId" element={<EditPost />} />
  </Routes>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Nav />
      {Menu}
    </ThemeProvider>
  );
};

export default App;
