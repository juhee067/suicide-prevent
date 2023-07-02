import React from "react";
import styled from "styled-components";
import { HighlightText } from "../styled/styledSpanagraph";

const Label = styled.label``;

const FileInput = styled.input`
  display: none;
`;

interface AttachmentButtonProps {
  children: React.ReactNode; // children prop을 추가
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileAttachmentButton: React.FC<AttachmentButtonProps> = ({ children, onChange }) => {
  return (
    <Label>
      <FileInput type="file" id="file" onChange={onChange} multiple />
      <HighlightText showUnderline={true}>{children}</HighlightText>
    </Label>
  );
};

export default FileAttachmentButton;
