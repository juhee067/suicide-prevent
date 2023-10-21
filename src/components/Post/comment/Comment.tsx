import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebaseConfig";
import { displayCreatedAt } from "../../../module/postTime";
import { Caption } from "../../../module/styled/styledFont";
import CommentUser from "./CommentUser";
import EditComment from "./EditComment";

const CommentContainer = styled.div`
  margin-top: 30px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.mainGray};
  padding: 10px;
  margin: 10px 0;
`;

const CommentBox = styled.div`
  width: 100%;
`;

const CommentContent = styled(Caption)`
  margin-bottom: 5px;
`;

const CommentTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;

interface CommentsProps {
  comments: DocumentData[];
  postId: any;
  fetchComments: () => Promise<void>;
  loginUser: string | null;
}

function Comment({ comments, postId, fetchComments, loginUser }: CommentsProps) {
  const [commentItems, setCommentItems] = useState(comments);
  // 수정 상태를 관리하는 상태 변수
  const [editStatus, setEditStatus] = useState(false);
  // 수정된 댓글 내용을 관리하는 상태 변수
  const [editedComment, setEditedComment] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState("");

  const fetchCommentsList = async () => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const q = query(commentsRef, orderBy("commentTime", "desc"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const commentsData = querySnapshot.docs.map((doc: { data: () => any; id: any }) => {
          const data = doc.data();
          return {
            commentId: doc.id,
            userName: data.userName, // 댓글 작성자 이름 가져오기
            comment: data.comment, // 댓글 내용 가져오기
            commentTime: data.commentTime, // 댓글 작성 시간 가져오기
          };
        });

        setCommentItems(commentsData); // 댓글 데이터를 업데이트
      } else {
        setCommentItems([]);
      }
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchCommentsList();
  }, []);

  const commentDelete = async (commentId: string) => {
    try {
      const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);
      await deleteDoc(commentRef);

      await fetchCommentsList(); // 댓글 삭제 후 목록을 다시 불러와서 업데이트

      alert("댓글을 삭제하시겠습니까?");
      alert("댓글을 삭제하셨습니다.");
    } catch (error) {
      console.error("댓글을 삭제하는 중 오류가 발생했습니다.", error);
    }
  };

  // 댓글 수정 버튼 클릭 시 실행되는 함수
  const handleEditClick = (commentId: string, initialComment: string) => {
    // 수정 상태를 true로 변경하고, 수정된 댓글 내용을 초기 댓글 내용으로 설정
    setEditStatus(true);
    setEditedComment(initialComment);
    setSelectedCommentId(commentId); // 선택한 댓글의 ID를 상태에 저장
  };

  // 댓글 수정 취소 시 실행되는 함수
  const handleCancelClick = () => {
    // 수정 상태를 false로 변경하고, 수정된 댓글 내용 초기화
    setEditStatus(false);
    setEditedComment("");
  };

  // 댓글 수정 완료 시 실행되는 함수
  const handleEditSubmit = async (commentId: string) => {
    try {
      // Firebase Firestore에서 해당 댓글 문서에 대한 참조 가져오기
      const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);

      await updateDoc(commentRef, {
        comment: editedComment,
      });

      await fetchCommentsList();

      setEditStatus(false);
      setEditedComment("");
    } catch (error) {
      console.error("댓글을 수정하는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <CommentContainer>
      <CommentList>
        {commentItems.map((comment) => (
          <CommentItem key={comment.commentId}>
            <CommentBox>
              <CommentUser
                commentItems={comment}
                handleEditClick={handleEditClick}
                commentDelete={commentDelete}
                editStatus={editStatus}
                loginUser={loginUser}
              />

              {selectedCommentId === comment.commentId && editStatus ? (
                <>
                  <EditComment
                    editedComment={editedComment}
                    commentId={comment.commentId}
                    setEditedComment={setEditedComment}
                    handleEditSubmit={handleEditSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                </>
              ) : (
                <CommentContent>{comment.comment}</CommentContent>
              )}

              <CommentTime>{displayCreatedAt(comment.commentTime)}</CommentTime>
            </CommentBox>
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
}

export default Comment;
