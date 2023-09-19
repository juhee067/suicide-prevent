import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexRowCenterDiv } from "../../module/styled/FlexDiv";
import { Btn, HighlightText } from "../../module/styled/styledFont";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPost, getUserNicknameByEmail } from "../../module/firestore";

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

const FormFile = styled.input`
  display: none;
`;

const FileDragArea = styled(FlexRowCenterDiv)`
  gap: 10px;
  height: 100px;
  margin-bottom: 12px;
  font-size: 1.5rem;
  border: 2px dotted #a4a4a4;
  border-radius: 4px;
  font-size: 1.3rem;
`;

const FormFileLabel = styled.label``;

const FileAttachment = styled(HighlightText)``;

const UploadedFileList = styled.ul`
  display: flex;
  margin-bottom: 50px;
`;

const UploadedFileItem = styled(FlexRowCenterDiv)`
  padding: 10px;
  border-radius: 10px;
  margin-top: 8px;
  margin: 10px 5px;
  gap: 10px;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const FileName = styled.div`
  color: ${({ theme }) => theme.color.mainWhite};
`;
const Delete = styled.div`
  font-size: 1.5rem;
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

function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userNickname, setUserNickname] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false); // 드래그 오버 상태 관리

  const navigate = useNavigate();
  const userData = useSelector((state: { userLoginDataSlice: any }) => state.userLoginDataSlice);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    createPost({
      userNickname: userNickname,
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
    navigate("/post");
  };

  // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const fileArray = Array.from(files);
  //     setUploadedFiles([...uploadedFiles, ...fileArray]);
  //   }
  // };

  // const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const files = e.dataTransfer.files;
  //   if (files) {
  //     const fileArray = Array.from(files);
  //     setUploadedFiles([...uploadedFiles, ...fileArray]);
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragOver(true);
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragOver(false);
  // };

  useEffect(() => {
    const userEmailData = userData.userEmail;
    const getUserNickname = async () => {
      const nicknameData = await getUserNicknameByEmail(userEmailData);

      if (nicknameData !== null) {
        // nicknameData가 null이 아닌 경우에만 처리
        const foundObject = {
          email: userEmailData,
          nickname: nicknameData,
        };

        const nickname = foundObject.nickname;
        setUserNickname(nickname);
      } else {
        console.log(`이메일 ${userEmailData}에 해당하는 객체를 찾을 수 없습니다.`);
      }
    };

    getUserNickname();
  }, [uploadedFiles]);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </FormGroup>
        <FormGroup>
          <FormTextarea
            value={content}
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setContent(e.target.value)
            }
            placeholder="내용"
          />
        </FormGroup>
        <FormGroup>
          <FileDragArea
            // onDrop={handleFileDrop}
            // onDragOver={handleDragOver}
            // onDragLeave={handleDragLeave}
            className={isDragOver ? "dragover" : ""}
          >
            <FormFileLabel htmlFor="fileInput">
              <FileAttachment $showunderline> 파일 첨부</FileAttachment>
            </FormFileLabel>
            or
            <FileAttachment>파일 드래그</FileAttachment>
            <FormFile
              id="fileInput"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              // onChange={handleFileInputChange}
            />
          </FileDragArea>

          <UploadedFileList>
            {uploadedFiles.map((file, index) => (
              <UploadedFileItem key={index}>
                <FileName>{file.name}</FileName>
                <Delete>
                  <AiOutlineCloseCircle />
                </Delete>
              </UploadedFileItem>
            ))}
          </UploadedFileList>
        </FormGroup>

        <FormCancel>취소하기</FormCancel>
        <FormButton type="submit">게시하기</FormButton>
      </Form>
    </FormContainer>
  );
}

export default PostCreate;
