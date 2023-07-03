import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Img } from "../common/Img";
import { CenterAlign } from "../styled/CenterAlignment";

const PictureBox = styled(CenterAlign)``;

const Picture = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border: 5px solid #fff;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  user-select: none;
  cursor: pointer;
`;

const PictureImg = styled(Img)`
  display: block;
  width: 300px;
  height: 300px;
  pointer-events: none;
`;

const PictureNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 70px;
  padding: 12px 24px;
  font-size: 1.5rem;
  text-align: center;
`;

const PhotoCard = () => {
  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: string[] }) => state.attachedFileListSlice
  );

  const picturesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pictures = picturesRef.current;

    const updateElementPosition = (element: HTMLDivElement, event: MouseEvent | TouchEvent) => {
      let movementX, movementY;

      if (event.type === "touchmove") {
        const touch = (event as TouchEvent).touches[0];
        movementX = touch.clientX - (previousTouch?.clientX || 0);
        movementY = touch.clientY - (previousTouch?.clientY || 0);
        previousTouch = touch;
      } else {
        movementX = (event as MouseEvent).movementX;
        movementY = (event as MouseEvent).movementY;
      }

      const elementY = parseInt(element.style.top || "0", 10) + movementY;
      const elementX = parseInt(element.style.left || "0", 10) + movementX;

      element.style.top = elementY + "px";
      element.style.left = elementX + "px";
    };

    const startDrag: EventListener = (event: MouseEvent | TouchEvent) => {
      const element = (event.currentTarget as HTMLDivElement)?.closest(
        ".picture"
      ) as HTMLDivElement | null;
      if (!element) return;

      const updateFunction = (event: MouseEvent | TouchEvent) => updateElementPosition(element, event);
      const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction });
      document.addEventListener("mousemove", updateFunction);
      document.addEventListener("touchmove", updateFunction);
      document.addEventListener("mouseup", stopFunction);
      document.addEventListener("touchend", stopFunction);
    };

    const stopDrag = (functions: {
      update: (event: MouseEvent | TouchEvent) => void;
      stop: () => void;
    }) => {
      previousTouch = undefined;
      document.removeEventListener("mousemove", functions.update);
      document.removeEventListener("touchmove", functions.update);
      document.removeEventListener("mouseup", functions.stop);
      document.removeEventListener("touchend", functions.stop);
    };

    let previousTouch: Touch | undefined;

    picturesRef.current.forEach((picture) => {
      if (picture) {
        const range = 100;
        const randomX = Math.random() * (range * 2) - range;
        const randomY = Math.random() * (range * 2) - range;
        const randomRotate = Math.random() * (range / 2) - range / 4;

        picture.style.top = `${randomY}px`;
        picture.style.left = `${randomX}px`;
        picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;

        picture.addEventListener("mousedown", startDrag);
        picture.addEventListener("touchstart", startDrag);
      }
    });

    return () => {
      pictures.forEach((picture) => {
        if (picture) {
          picture.removeEventListener("mousedown", startDrag);
          picture.removeEventListener("touchstart", startDrag);
        }
      });
    };
  }, []);
  return (
    <PictureBox>
      {attachedFileList.map((image, id) => (
        <Picture className="picture" key={id} ref={(el) => (picturesRef.current[id] = el)}>
          <PictureImg src={image} />
          <PictureNote></PictureNote>
        </Picture>
      ))}
    </PictureBox>
  );
};

export default PhotoCard;
