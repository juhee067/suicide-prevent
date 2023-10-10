// firebaseUtils.js

import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fetchMessages = (setMessages: (arg0: any[]) => void) => {
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection, orderBy("createdAt", "asc"), limit(100));

  onSnapshot(q, (querySnapshot) => {
    const updatedMessages: any[] = [];
    querySnapshot.forEach((doc) => {
      updatedMessages.push(doc.data());
    });
    setMessages(updatedMessages);
  });
};
