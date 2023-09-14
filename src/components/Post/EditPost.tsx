import { collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { db } from "../../firebaseConfig";
import { FlexColumnCenterDiv } from "../../module/styled/FlexDiv";
import EditPostForm from "./EditPostForm";

const EditPostWrapper = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

function EditPost() {
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출

  const [postData, setPostData] = useState<DocumentData | null>(null);
  useEffect(() => {
    // Firebase Firestore에서 해당 게시물의 정보를 가져오는 비동기 함수
    async function fetchPost() {
      try {
        const postRef = doc(collection(db, "posts"), postId); // "posts"는 컬렉션 이름, yourFirestoreInstance는 Firestore 인스턴스입니다.
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          setPostData(docSnap.exists() ? docSnap.data() : null);
        } else {
          console.log("게시물을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
      }
    }

    fetchPost(); // 게시물 정보를 가져오는 함수 호출
  }, [postId]);
  // 게시물 편집 폼 컴포넌트로 postData를 전달하여 기본 값으로 설정
  return (
    <EditPostWrapper>
      <EditPostForm initialData={postData} />
    </EditPostWrapper>
  );
}

export default EditPost;
