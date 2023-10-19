import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { 
  getAuth,// authentication 설정
  signInWithEmailAndPassword,// email 로그인
  createUserWithEmailAndPassword, //email 회원가입
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDho3nLDhmLb9GhFu0XndeOfw5mwV9TOI",
  authDomain: "helpgatekeeper.firebaseapp.com",
  projectId: "helpgatekeeper",
  storageBucket: "helpgatekeeper.appspot.com",
  messagingSenderId: "6877543437",
  appId: "1:6877543437:web:0e3218cd5409b614706944",
  measurementId: "G-YXXEZCCGH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

//Email 로그인
export const signupEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};



