import React, { Fragment } from "react";
import { Line } from "react-konva";
import { Region } from "../types";

import { Points } from "./Points";

interface Props {
  region: Region;
}

export const Shape: React.FC<Props> = ({ region }) => {
  const { points, closed } = region;

  return (
    <Fragment>
      <Line
        closed={closed}
        strokeWidth={3}
        fill="rgb(68, 232, 145)"
        stroke="rgb(68, 232, 145)"
        points={[...points.flatMap(({ x, y }: any) => [x, y])]}
      />
      <Points points={points} closed={closed} />
    </Fragment>
  );
};
