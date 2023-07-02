import React from "react";
import styled from "styled-components";
import { FlexColumnCenterDiv } from "../styled/FlexDiv";
import { ErrorText, Paragraph } from "../styled/styledSpanagraph";
import { AiFillFileAdd } from "react-icons/ai";
import FileAttachmentButton from "./FileAttachmentButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAttachedFileList } from "../../store/reducer/attachedFileList";

const DragBox = styled(FlexColumnCenterDiv)`
  padding: 0 20px;
  gap: 30px;
  height: 400px;
  line-height: 1.5;
`;

const Icon = styled.div`
  font-size: 5em;
`;

const FileUploadForm = styled.div``;

const FileDragAttachment = () => {
  const dispatch = useDispatch();
  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: string[] }) => state.attachedFileListSlice
  );

  // 이미지 상대경로 저장
  const handleAddImages = (event: { target: { files: any } }) => {
    const imageLists = Array.from(event.target.files) as File[];
    let newImageUrlLists = [...attachedFileList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      newImageUrlLists.push(currentImageUrl);
    }

    if (newImageUrlLists.length > 6) {
      newImageUrlLists = newImageUrlLists.slice(0, 6);
    }
    dispatch(setAttachedFileList(newImageUrlLists));
  };

  // X버튼 클릭 시 이미지 삭제
  //   const handleDeleteImage = (id: number) => {
  //     setShowImages(showImages.filter((_, index) => index !== id));
  //   };

  return (
    <DragBox>
      <Icon>
        <AiFillFileAdd />
      </Icon>
      <FileUploadForm>
        <Paragraph>파일을 드래그하여 여기에 끌어 놓거나 </Paragraph>
        <FileAttachmentButton onChange={handleAddImages}>첨부하기</FileAttachmentButton>
        <Paragraph>버튼을 클릭하세요</Paragraph>
        <ErrorText>* 파일을 첨부하지 않으면 이미지가 나오지 않습니다</ErrorText>
      </FileUploadForm>
    </DragBox>
  );
};

export default FileDragAttachment;
