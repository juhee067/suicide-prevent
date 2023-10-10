import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  message: string;
  id: string;
  // 다른 필요한 속성들을 여기에 추가할 수 있습니다.
}

// export function useFirestoreQuery(query: any): ChatMessage[] {
//   const [docs, setDocs] = useState<ChatMessage[]>([]);

//   const queryRef = useRef(query);

//   useEffect(() => {
//     if (!queryRef?.current?.isEqual(query)) {
//       queryRef.current = query;
//     }
//   });

//   useEffect(() => {
//     if (!queryRef.current) {
//       return null;
//     }

//     const unsubscribe = queryRef.current.onSnapshot((querySnapshot: { docs: any[] }) => {
//       const data = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       setDocs(data);
//     });

//     return unsubscribe;
//   }, [queryRef]);

//   return docs;
// }
