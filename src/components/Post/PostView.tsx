import { collection, deleteDoc, doc, DocumentData, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { formatDateTime } from "../../module/postTime";
import { FlexRowCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Description } from "../../module/styled/styledFont";

const PostViewBox = styled.div``;

const PostHeaderBox = styled(FlexRowDiv)`
  justify-content: space-between;
  align-items: center;
`;

const WritingBox = styled(FlexRowCenterDiv)`
  gap: 20px;
`;

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 1.8rem;
  cursor: pointer;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;
const PostTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;
const PostAuthor = styled(Caption)``;

const PostContent = styled(Description)`
  height: 100px;
  margin: 20px;
`;

const PostContentBox = styled.div`
  margin: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.mainBlack};
  border-bottom: 1px solid ${({ theme }) => theme.color.mainBlack};
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
`;

const PostView = ({ postId }: any) => {
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);
  // URL 파라미터에서 게시물 ID를 추출
  let navigator = useNavigate();
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );

  const currentUser = useSelector((state: { userLoginDataSlice: any }) => state.userLoginDataSlice);

  useEffect(() => {
    // Firebase Firestore에서 해당 게시물의 정보를 가져오는 비동기 함수
    async function fetchPost() {
      try {
        const postRef = doc(collection(db, "posts"), postId); // "posts"는 컬렉션 이름, yourFirestoreInstance는 Firestore 인스턴스입니다.
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          const postData = docSnap.data(); // 게시물 정보를 가져옵니다.
          setDetailPost({ ...postData, postId });
        } else {
          console.log("게시물을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
      }
    }

    fetchPost(); // 게시물 정보를 가져오는 함수 호출
  }, [postId]);

  if (!detailPost) {
    return <div>Loading...</div>;
  }

  const postDelete = async (postId: string) => {
    try {
      const postRef = doc(db, "posts", postId); // 삭제할 게시물의 문서에 대한 참조
      await deleteDoc(postRef); // Firestore에서 게시물 삭제

      // 삭제가 성공하면 원하는 동작을 수행할 수 있습니다.
      console.log("게시물이 성공적으로 삭제되었습니다.");
      navigator("/post");
    } catch (error) {
      console.error("게시물을 삭제하는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <PostViewBox>
      <PostHeaderBox>
        <WritingBox>
          <PostTitle>{detailPost.title}</PostTitle>
          <PostAuthor>{detailPost.userName}</PostAuthor>
          <PostTime>{formatDateTime(detailPost.postTime)}</PostTime>
        </WritingBox>
        {accessToken && currentUser.nickName === detailPost.userName ? (
          // 댓글 작성자와 현재 사용자가 동일한 경우 수정 및 삭제 버튼 표시
          <UserActions>
            <Link to={`/post/edit/${postId}`}>
              <FiEdit />
            </Link>

            <FiDelete onClick={() => postDelete(postId)} />
          </UserActions>
        ) : null}
      </PostHeaderBox>
      <PostContentBox>
        {detailPost.previewImage ? <PreviewImage>{detailPost.previewImage}</PreviewImage> : null}

        <PostContent>{detailPost.content}</PostContent>
      </PostContentBox>
    </PostViewBox>
  );
};

export default PostView;
