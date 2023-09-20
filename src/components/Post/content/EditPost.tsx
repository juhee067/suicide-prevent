import { collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { db } from "../../../firebaseConfig";
import { getPosts } from "../../../module/firestore";
import { FlexColumnCenterDiv } from "../../../module/styled/FlexDiv";
import EditPostForm from "./EditPostForm";

const EditPostWrapper = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

function EditPost() {
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getPosts();
        const selectedPost = posts.find((post) => post.postId === postId);
        if (selectedPost) {
          setDetailPost(selectedPost);
        } else {
          console.log("게시물을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
      }
    }

    fetchPost();
  }, [postId]);
  // 게시물 편집 폼 컴포넌트로 postData를 전달하여 기본 값으로 설정
  return (
    <EditPostWrapper>
      <EditPostForm detailPost={detailPost} />
    </EditPostWrapper>
  );
}

export default EditPost;
