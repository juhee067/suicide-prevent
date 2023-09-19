// UploadedFileList.js

import React from "react";
import { styled } from "styled-components";
import UploadedFileItem from "./UploadedFileItem";

const UploadedFileListBox = styled.ul`
  display: flex;
  margin-bottom: 50px;
`;

function UploadedFileList({ uploadedFiles }: { uploadedFiles: any[] }) {
  return (
    <UploadedFileListBox>
      {uploadedFiles.map((file: any, index: number) => (
        <UploadedFileItem key={index} file={file} />
      ))}
    </UploadedFileListBox>
  );
}

export default UploadedFileList;
