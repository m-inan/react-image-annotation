import React, { useRef } from "react";
import { Stage } from "react-konva";

import { Map } from "./Map";

interface Props {
  width: number;
  height: number;
}

export const Annotation: React.FC<Props> = () => {
  const _stage = useRef(null);

  return (
    <Stage ref={_stage}>
      <Map />
    </Stage>
  );
};

