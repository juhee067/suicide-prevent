import { collection, getDocs, DocumentData, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface PostItemData {
  postId: string;
  userName: string;
  title: string;
  content: string;
  comments: number;
  postTime: string;
}

interface UserData {
  userNickname: string;
  title: string;
  content: string;
}

// 게시글 불러오기
export async function getPosts(): Promise<PostItemData[]> {
  try {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    const posts: PostItemData[] = [];

    snapshot.forEach((doc: DocumentData) => {
      const postData = { ...doc.data(), postId: doc.id };
      posts.push(postData);
    });

    return posts;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return []; // 에러 처리를 위해 빈 배열을 반환하거나 다른 처리 방법을 사용할 수 있습니다.
  }
}

// 댓글 수 업데이트
export async function updateCommentCount(postId: string) {
  try {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsRef);
    const commentCount = querySnapshot.size; // 댓글 수 계산

    // 해당 게시물 문서 업데이트
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: commentCount, // 댓글 수를 업데이트
    });
  } catch (error) {
    console.error("댓글 수 업데이트 실패:", error);
  }
}

export const createPost = async ({ userNickname, title, content }: UserData) => {
  try {
    const usersCollectionRef = collection(db, "posts");

    await addDoc(usersCollectionRef, {
      userName: userNickname,
      title: title,
      content: content,
      postTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

export const getUserNicknameByEmail = async (userEmailData: string) => {
  try {
    const usersCollectionRef = collection(db, "nickName");

    const querySnapshot = await getDocs(usersCollectionRef);
    const documents = querySnapshot.docs.map((doc) => {
      const data = doc.data() as { email: string; nickname: string; id: string };
      return { ...data, id: doc.id };
    });

    const foundObject = documents.find((item) => item.email === userEmailData);

    if (foundObject) {
      const nickname = foundObject.nickname;
      return nickname;
    } else {
      console.log(`이메일 ${userEmailData}에 해당하는 객체를 찾을 수 없습니다.`);
      return null;
    }
  } catch (error) {
    console.error("닉네임 가져오기 실패:", error);
    return null; // 에러 처리를 위해 null을 반환하거나 다른 처리 방법을 사용할 수 있습니다.
  }
};
