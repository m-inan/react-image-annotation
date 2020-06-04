import React, { Fragment } from "react";
import { Line } from "react-konva";
import { Region } from "../types";

import { Points } from "./Points";

interface Props {
  region: Region;
}

export const Shape: React.FC<Props> = ({ region }) => {
  const { id, points, closed } = region;

  return (
    <Fragment>
      <Line
        id={`line-${id}`}
        closed={closed}
        strokeWidth={3}
        fill="rgb(68, 232, 145)"
        stroke="rgb(68, 232, 145)"
        points={[...points.flatMap(({ x, y }: any) => [x, y])]}
      />
      <Points {...region} />
    </Fragment>
  );
};
