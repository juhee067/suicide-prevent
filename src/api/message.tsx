// firebaseUtils.js

import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface ChatMessage {
  text: string;
  createdAt: any;
}

export const fetchMessages = (setMessages: (messages: ChatMessage[]) => void) => {
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection, orderBy("createdAt", "asc"), limit(100));

  onSnapshot(q, async (querySnapshot) => {
    const updatedMessages: ChatMessage[] = [];

    for (const doc of querySnapshot.docs) {
      const messageData = doc.data() as ChatMessage;

      // 메시지 객체에 사용자 UID와 닉네임 추가
      updatedMessages.push(messageData);
    }

    setMessages(updatedMessages);
  });
};
