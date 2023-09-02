import React, { useState } from "react";
import styled from "styled-components";

// 스타일드 컴포넌트를 사용하여 폼 요소를 스타일링합니다.
const FormContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

function BoardForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    console.log("게시글 제목:", title);
    console.log("게시글 내용:", content);
    setTitle("");
    setContent("");
  };

  return (
    <FormContainer>
      <FormTitle>게시판 폼</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>제목:</FormLabel>
          <FormInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>내용:</FormLabel>
          <FormTextarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormGroup>
        <FormButton type="submit">게시글 작성</FormButton>
      </form>
    </FormContainer>
  );
}

export default BoardForm;
