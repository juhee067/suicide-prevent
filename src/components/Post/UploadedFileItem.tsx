// UploadedFileItem.js

import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { styled } from "styled-components";
import { FlexRowCenterDiv } from "../../module/styled/FlexDiv";

const FileName = styled.div`
  color: ${({ theme }) => theme.color.mainWhite};
`;
const Delete = styled.div`
  font-size: 1.5rem;
`;

const UploadedFileItemBox = styled(FlexRowCenterDiv)`
  padding: 10px;
  border-radius: 10px;
  margin-top: 8px;
  margin: 10px 5px;
  gap: 10px;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

function UploadedFileItem(file: any) {
  return (
    <UploadedFileItemBox>
      <FileName>{file.name}</FileName>
      <Delete>
        <AiOutlineCloseCircle />
      </Delete>
    </UploadedFileItemBox>
  );
}

export default UploadedFileItem;
