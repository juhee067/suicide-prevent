import React from 'react';
import styled from 'styled-components';
import { FlexColumnCenterDiv } from '../../module/styled/FlexDiv';

const BackdropBox = styled(FlexColumnCenterDiv)<{ opacity: string }>`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  opacity: ${({ opacity }) => opacity};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const Backdrop = ({ opacityValue }: { opacityValue: string }) => {
  return <BackdropBox opacity={opacityValue} />;
};

export default Backdrop;
