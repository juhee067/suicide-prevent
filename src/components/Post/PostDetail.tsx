import { addDoc, collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useId, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { formatDateTime } from "../../module/postTime";
import { FlexColumnCenterDiv, FlexRowCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { Btn, Caption, Description, Subtitle } from "../../module/styled/styledFont";
import Comment from "./Comment";

// 스타일드 컴포넌트를 사용하여 상세보기 스타일을 정의합니다.
const CenteredContainer = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

const DetailContainer = styled.div`
  width: 50%;
  max-width: 1200px;
  padding: 20px;
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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

const CommentForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const CommentSubmitButton = styled.button`
  padding: 16px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.color.mainBlack};
  color: ${({ theme }) => theme.color.mainWhite};
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

const CommentBox = styled.div``;

const CommentCount = styled(Caption)``;

function PostDetail() {
  const uniqueId = useId();
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출
  const [postID, setPostID] = useState<string | undefined>("");
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<DocumentData[]>([]);
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );
  const currentUser = useSelector((state: { userLoginDataSlice: any }) => state.userLoginDataSlice);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    createComment();

    // 댓글 입력 필드 초기화
    setComment("");
  };
  const usersCollectionRef = collection(db, `posts/${postId}/comments`);

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

  useEffect(() => {
    // Firebase Firestore에서 해당 게시물의 댓글 정보를 가져오는 비동기 함수
    async function fetchComments() {
      try {
        const commentsRef = collection(db, `posts/${postId}/comments`); // "comments"는 댓글 컬렉션 이름
        const querySnapshot = await getDocs(commentsRef);

        if (!querySnapshot.empty) {
          const commentsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, commentId: doc.id }; // 댓글 문서 ID를 추가해서 저장
          });
          setComments(commentsData);
        } else {
          console.log("댓글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
      }
    }
    console.log(detailPost, "detailPost");
    fetchComments(); // 댓글 정보를 가져오는 함수 호출
  }, []);

  // 게시물 정보가 로드되기 전에는 로딩 상태를 처리할 수 있습니다.
  if (!detailPost) {
    return <div>Loading...</div>;
  }

  const AccessTokenError = () => {
    alert("로그인을 해주세요");
  };

  const createComment = async () => {
    try {
      // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
      await addDoc(usersCollectionRef, {
        commentId: uniqueId,
        userName: currentUser.nickname,
        comment: comment,
        commentTime: new Date().toISOString(),
      });

      setComment("");
      console.log("댓글 전달");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <CenteredContainer>
      <DetailContainer>
        <PostHeaderBox>
          <WritingBox>
            <PostTitle>{detailPost.title}</PostTitle>
            <PostAuthor>{detailPost.userName}</PostAuthor>
            <PostTime>{formatDateTime(detailPost.postTime)}</PostTime>
          </WritingBox>
          {accessToken && currentUser && currentUser.nickname === detailPost.userName ? (
            // 댓글 작성자와 현재 사용자가 동일한 경우 수정 및 삭제 버튼 표시
            <UserActions>
              <FiEdit />
              <FiDelete />
            </UserActions>
          ) : null}
        </PostHeaderBox>
        <PostContentBox>
          {detailPost.previewImage ? <PreviewImage>{detailPost.previewImage}</PreviewImage> : null}

          <PostContent>{detailPost.content}</PostContent>
        </PostContentBox>
        <CommentForm>
          <CommentInput
            placeholder="댓글을 작성하세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {accessToken ? (
            <CommentSubmitButton onClick={handleSubmit}>작성</CommentSubmitButton>
          ) : (
            <CommentSubmitButton onClick={AccessTokenError}>작성</CommentSubmitButton>
          )}
        </CommentForm>
        <CommentBox>
          {comments ? (
            <>
              <CommentCount>댓글 수: {comments.length}</CommentCount>
              <Comment comments={comments} />
            </>
          ) : (
            <CommentCount>댓글이 없습니다.</CommentCount>
          )}
        </CommentBox>
      </DetailContainer>
    </CenteredContainer>
  );
}

export default PostDetail;
