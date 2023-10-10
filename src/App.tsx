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

// 10분 동안 활동이 없을 경우 로그아웃되는 시간(밀리초)을 정의합니다.
// const AUTO_LOGOUT_TIME = 10 * 60 * 1000;

const App = React.memo(() => {
  // const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null); // Use NodeJS.Timeout for setTimeout

  // const storedAutoLogin = localStorage.getItem("autoLogin");

  // // 사용자 활동을 감지하는 이벤트 핸들러를 정의합니다.
  // const handleUserActivity = () => {
  //   if (logoutTimer) {
  //     clearTimeout(logoutTimer); // 기존 타이머를 초기화합니다.
  //   }

  //   // 새로운 타이머를 시작합니다.
  //   const newLogoutTimer = setTimeout(() => {
  //     persistor.purge(); // Redux Persist로 상태를 초기화합니다.
  //   }, AUTO_LOGOUT_TIME);

  //   setLogoutTimer(newLogoutTimer); // 로그아웃 타이머를 상태에 저장합니다.
  // };

  // // 컴포넌트가 마운트될 때 사용자 활동 감지 이벤트 리스너를 등록합니다.
  // useEffect(() => {
  //   if (storedAutoLogin === "false") {
  //     handleUserActivity();
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Nav />
      {Menu}
    </ThemeProvider>
  );
});

export default React.memo(App);
