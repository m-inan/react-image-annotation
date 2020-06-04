import React, { Fragment } from "react";
import { Circle, Rect } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";

import { ID, Point, Region } from "../types";
import { store } from "../store";

interface Props {
  id: ID;
  points: Point[];
  closed: boolean;
}

export const Points: React.FC<Props> = ({ id, closed, points }: Props) => {
  const onVertexMouseDown = (_e: KonvaEventObject<MouseEvent>, id: number) => {
    const { regions, setRegions } = store.getState();

    setRegions(
      regions.map((item: Region) => {
        if (item.id === id) {
          item.closed = true;
        }

        return item;
      })
    );
  };

  const setStageCursor = (
    { target }: KonvaEventObject<MouseEvent>,
    type: string
  ) => {
    const stage = target.getStage();

    if (stage) {
      stage.container().style.cursor = type;
    }
  };

  return (
    <Fragment>
      {points.map(({ x, y, id: pointId }: Point, key: number) => {
        if (key !== 0 || closed) {
          return (
            <Rect
              draggable={closed}
              x={x}
              y={y}
              id={String(pointId)}
              key={key}
              width={15}
              height={15}
              offsetX={7.5}
              offsetY={7.5}
              opacity={0.8}
              /* scaleX={invertedScale} */
              /* scaleY={invertedScale} */
              name="region-rect"
              fill="rgb(68, 232, 145)"
              /* onDragMove={onDragMove} */
              /* onDragEnd={onDragEnd} */
              onMouseEnter={(e) => closed && setStageCursor(e, "move")}
              onMouseLeave={(e) => closed && setStageCursor(e, "default")}
            />
          );
        } else {
          return (
            <Circle
              x={x}
              y={y}
              key={key}
              radius={10}
              opacity={0.8}
              strokeWidth={2}
              /* scaleX={invertedScale} */
              /* scaleY={invertedScale} */
              name="region-circle"
              stroke="rgb(68, 232, 145)"
              onMouseEnter={(e) => setStageCursor(e, "pointer")}
              onMouseLeave={(e) => setStageCursor(e, "default")}
              onMouseDown={(e) => onVertexMouseDown(e, id)}
            />
          );
        }
      })}
    </Fragment>
  );
};
