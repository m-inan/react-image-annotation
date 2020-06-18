import React, { Fragment } from "react";
import { Line } from "react-konva";
import { Region } from "../types";

import { Points } from "./Points";
import { useStore } from "../store";

interface Props {
  region: Region;
}

export const Shape: React.FC<Props> = ({ region }) => {
  const { id, points, closed } = region;

  const { width, height } = useStore((s) => s.dimension);
  const size = ((width + height) / 2) * 0.002;

  return (
    <Fragment>
      <Line
        id={`line-${id}`}
        closed={closed}
        strokeWidth={size}
        fill="rgba(68, 232, 145, .5)"
        stroke="rgb(68, 232, 145)"
        points={[...points.flatMap(({ x, y }: any) => [x, y])]}
      />
      <Points {...region} />
    </Fragment>
  );
};
