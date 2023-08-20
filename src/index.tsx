import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDho3nLDhmLb9GhFu0XndeOfw5mwV9TOI",
  authDomain: "helpgatekeeper.firebaseapp.com",
  projectId: "helpgatekeeper",
  storageBucket: "helpgatekeeper.appspot.com",
  messagingSenderId: "6877543437",
  appId: "1:6877543437:web:0e3218cd5409b614706944",
  measurementId: "G-YXXEZCCGH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
