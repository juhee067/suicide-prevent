import { collection, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { FlexRowCenterDiv } from "../../../module/styled/FlexDiv";
import { Btn } from "../../../module/styled/styledFont";
import { db } from "../../../firebaseConfig";
import UploadedFileList from "../file/UploadedFileList";
import FileDragArea from "../file/FileDragArea";
import { getPosts } from "../../../module/firestore";
const FormContainer = styled.div`
  width: 80%;
  max-width: 1000px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Form = styled.form``;

const FormGroup = styled.div`
  text-align: left;
  margin-bottom: 16px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;

  font-size: 16px;
  border-bottom: 1px solid #ccc;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const FormCancel = styled(Btn)`
  margin-right: 10px;
  color: ${({ theme }) => theme.color.mainBlack};
  background-color: ${({ theme }) => theme.color.mainWhite};
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  &:hover {
    color: 1px solid ${({ theme }) => theme.color.mainWhite};
    background-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const FormButton = styled(Btn)``;

function EditPostForm(initialData: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false); // 드래그 오버 상태 관리
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function fetchPost() {
  //     try {
  //       const postRef = doc(collection(db, "posts"), postId);
  //       const docSnap = await getDoc(postRef);

  //       if (docSnap.exists()) {
  //         const postData = docSnap.data();
  //         setDetailPost({ ...postData, postId });
  //         console.log(detailPost, "detailPost");
  //       } else {
  //         console.log("게시물을 찾을 수 없습니다.");
  //       }
  //     } catch (error) {
  //       console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
  //     }
  //   }

  //   fetchPost();
  // }, [postId]);

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

  useEffect(() => {
    if (detailPost) {
      // detailPost가 존재하면 폼 컨트롤의 초기값 설정
      setTitle(detailPost.title);
      setContent(detailPost.content);
    }
  }, [detailPost]);

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setContent(e.target.value);
  };
  // 폼 제출 시 호출되는 함수

  const editPost = async () => {
    try {
      const postRef = doc(collection(db, "posts"), postId); // 기존 데이터를 수정할 문서에 대한 참조
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const postData = docSnap.data(); // 가져온 데이터

        // 수정할 내용을 postData 객체에 반영
        postData.title = title; // 새로운 제목으로 업데이트
        postData.content = content; // 새로운 내용으로 업데이트

        // Firestore에 데이터 업데이트
        await updateDoc(postRef, postData);

        // 업데이트가 완료되면 페이지를 다시 보여줄 수 있습니다.
        navigate(`/post/${postId}`);
      } else {
        console.log("게시물을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("게시물을 수정하는 중 오류가 발생했습니다.", error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    setTitle("");
    setContent("");
    editPost();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...fileArray]);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            type="text"
            name="title" // input 요소의 name 속성을 추가해야 합니다.
            value={title}
            onChange={handleTitleChange}
            placeholder="제목"
          />
        </FormGroup>

        <FormGroup>
          <FormTextarea
            name="content" // textarea 요소의 name 속성을 추가해야 합니다.
            value={content}
            onChange={handleTextAreaChange}
            placeholder="내용"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <FileDragArea handleFileInputChange={handleFileInputChange} />
            <UploadedFileList uploadedFiles={uploadedFiles} />
          </FormGroup>
        </FormGroup>

        <FormCancel>
          <Link to="/post">취소하기</Link>
        </FormCancel>
        <FormButton type="submit">수정완료</FormButton>
      </Form>
    </FormContainer>
  );
}

export default EditPostForm;