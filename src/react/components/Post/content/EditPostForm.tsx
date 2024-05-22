import { collection, doc, DocumentData, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Btn } from '../../../module/styled/styledFont';
import { db } from '../../../firebaseConfig';
import UploadedFileList from '../file/UploadedFileList';
import FileDragArea from '../file/FileDragArea';
import { getPosts } from '../../../module/firestore';

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
    color: ${({ theme }) => theme.color.mainWhite};
    background-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const FormButton = styled(Btn)``;

function EditPostForm() {
  const [title, setTitle] = useState('');
  // 초기값을 detailPost에서 가져오도록 수정
  const [content, setContent] = useState('');
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출
  const navigate = useNavigate();
  const postCollectionRef = collection(db, 'posts');
  const postRef = doc(postCollectionRef, postId);

  async function fetchPost() {
    try {
      const posts = await getPosts();
      const selectedPost = posts.find((post) => post.postId === postId);
      if (selectedPost) {
        setDetailPost(selectedPost);
      } else {
        console.log('게시물을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 중 오류가 발생했습니다.', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (detailPost && detailPost.title) {
      setTitle(detailPost.title);
      setContent(detailPost.content);
    }
  }, [detailPost]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 폼 제출 시 호출되는 함수
  const editPost = async () => {
    try {
      if (!detailPost) {
        console.log('게시물을 찾을 수 없습니다.');
        return;
      }
      const updatedPostData = {
        ...detailPost,
        title,
        content,
      };
      await updateDoc(postRef, updatedPostData);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('게시물을 수정하는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !content) {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }

    setTitle('');
    setContent('');
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
      <Form>
        <FormGroup>
          <FormInput
            type='text'
            name='title'
            value={title}
            onChange={handleTitleChange}
            placeholder='제목'
          />
        </FormGroup>

        <FormGroup>
          <FormTextarea
            name='content'
            value={content}
            onChange={handleTextAreaChange}
            placeholder='내용'
          />
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <FileDragArea handleFileInputChange={handleFileInputChange} />
            <UploadedFileList uploadedFiles={uploadedFiles} />
          </FormGroup>
        </FormGroup>

        <FormCancel>
          <Link to='/post'>취소하기</Link>
        </FormCancel>
        <FormButton onClick={handleSubmit}>수정완료</FormButton>
      </Form>
    </FormContainer>
  );
}

export default EditPostForm;
