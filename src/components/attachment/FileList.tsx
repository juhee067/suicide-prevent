import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteAttachedFileArray } from "../../store/reducer/attachedFileList";
import Icon from "../common/Icon";
import { Img } from "../common/Img";

const FileListBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  gap: 5px;
`;

const ImgBox = styled.div`
  position: relative;
`;

const IconBox = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FileList = () => {
  const dispatch = useDispatch();

  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: string[] }) => state.attachedFileListSlice
  );

  return (
    <FileListBox>
      {attachedFileList.map((image, id) => {
        return (
          <ImgBox key={id}>
            <IconBox>
              <Icon fontSize="3rem" onClick={() => dispatch(deleteAttachedFileArray(id))}>
                <AiFillCloseCircle />
              </Icon>
            </IconBox>
            <Img src={image} alt={`${image}-${id}`} width="70px" />
          </ImgBox>
        );
      })}
    </FileListBox>
  );
};

export default FileList;
