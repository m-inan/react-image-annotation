import React, { Fragment } from "react";
import Konva from "konva";
import { Line } from "react-konva";
import { Region } from "../types";

import { Points } from "./Points";
import { Texts } from "./Texts";
import { useStore } from "../store";
import { calcProportion } from "../utils";

interface Props {
  region: Region;
}

export const Shape: React.FC<Props> = ({ region }) => {
  const { id, points, closed } = region;

  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);

  const onClick = () => {
    if (closed) {
      setSelected(id);
    }
  };

  const setStageCursor = (
    { target }: Konva.KonvaEventObject<MouseEvent>,
    type: "pointer" | "default"
  ) => {
    const stage = target.getStage();

    if (stage) {
      stage.container().style.cursor = type;
    }
  };

  const isSelected = selected === id;

  return (
    <Fragment>
      <Line
        id={`line-${id}`}
        name="region"
        closed={closed}
        lineCap="round"
        lineJoin="round"
        strokeWidth={calcProportion(2)}
        stroke="rgb(68, 232, 145)"
        fill={`rgba(68, 232, 145, ${isSelected ? "0.7" : "0.3"})`}
        points={[...points.flatMap(({ x, y }: any) => [x, y])]}
        onClick={onClick}
        onMouseEnter={(e) => closed && setStageCursor(e, "pointer")}
        onMouseLeave={(e) => closed && setStageCursor(e, "default")}
      />
      <Points {...region} />
      <Texts {...region} />
    </Fragment>
  );
};
