import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCHyjqEOngnKu9pHz1Twfr7Ve4vxXkI8cs",
  authDomain: "suicideprevent-101dc.firebaseapp.com",
  projectId: "suicideprevent-101dc",
  storageBucket: "suicideprevent-101dc.appspot.com",
  messagingSenderId: "3426565030",
  appId: "1:3426565030:web:f48202b1f7e22029a9ed67",
  measurementId: "G-CVY6091GLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);