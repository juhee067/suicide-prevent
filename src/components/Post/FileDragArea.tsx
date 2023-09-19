import React from "react";
import styled from "styled-components";
import { FlexRowCenterDiv } from "../../module/styled/FlexDiv";
import { HighlightText } from "../../module/styled/styledFont";

const FileDragAreaBox = styled(FlexRowCenterDiv)`
  height: 100px;
  margin-bottom: 12px;
  font-size: 1.5rem;
  border: 2px dotted #a4a4a4;
  border-radius: 4px;
`;
const FileDragAreaContent = styled(FlexRowCenterDiv)`
  gap: 10px;
`;
const FormFileLabel = styled.label``;

const FileAttachment = styled(HighlightText)``;
const FormFile = styled.input`
  display: none;
`;

const FileDragArea = ({ onDrop, onDragOver, onDragLeave, className, handleFileInputChange }: any) => (
  <FileDragAreaBox
    onDrop={onDrop}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    className={className}
  >
    <FileDragAreaContent>
      <FormFileLabel htmlFor="fileInput">
        <FileAttachment $showunderline> 파일 첨부</FileAttachment>
      </FormFileLabel>
      or
      <FileAttachment>파일 드래그</FileAttachment>
      <FormFile
        id="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={handleFileInputChange}
      />
    </FileDragAreaContent>
  </FileDragAreaBox>
);

export default FileDragArea;
