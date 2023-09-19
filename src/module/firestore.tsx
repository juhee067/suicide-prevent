import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface PostItemData {
  id: string;
  userName: string;
  title: string;
  content: string;
  comments: number;
  postTime: string;
}

export async function getPosts(): Promise<PostItemData[]> {
  try {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    const posts: PostItemData[] = [];

    snapshot.forEach((doc: DocumentData) => {
      const postData = doc.data() as PostItemData;
      posts.push(postData);
    });

    console.log(posts, "데이터 가져옴");
    return posts;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return []; // 에러 처리를 위해 빈 배열을 반환하거나 다른 처리 방법을 사용할 수 있습니다.
  }
}
