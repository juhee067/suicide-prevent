import React, { useEffect, useState, useId } from "react";

import GlobalStyles from "./style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./style/Theme";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/nav/Nav";
import Test from "./pages/Test";
import Information from "./pages/Information";
import Letter from "./pages/Letter";

// 파이어베이서 파일에서 import 해온 db
import { db } from "./firebaseConfig";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import { collection, getDocs, DocumentData, addDoc } from "firebase/firestore";

const App = React.memo(() => {
  const routes = [
    { path: "/", element: <Main /> },
    { path: "/letter", element: <Letter /> },
    { path: "/test", element: <Test /> },
    { path: "/information", element: <Information /> },
  ];
  // // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  // const [users, setUsers] = useState<DocumentData[]>([]);
  // const [newTitle, setNewTitle] = useState("");
  // const [newMessage, setNewMessage] = useState("");
  // const usersCollectionRef = collection(db, "users");
  // // db의 users 컬렉션을 가져옴
  // //   const usersCollectionRef = collection(db, "users");

  // // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  // const uniqueId = useId();
  // console.log(uniqueId);

  // // 시작될때 한번만 실행
  // useEffect(() => {
  //   const usersCollectionRef = collection(db, "users");

  //   // 비동기로 데이터 받을준비
  //   const getUsers = async () => {
  //     // getDocs로 컬렉션안에 데이터 가져오기
  //     const data = await getDocs(usersCollectionRef);
  //     // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);

  // const createUsers = async () => {
  //   // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
  //   await addDoc(usersCollectionRef, { title: newTitle, message: newMessage });
  // };
  // // 띄워줄 데이터 key값에 고유ID를 넣어준다.

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
