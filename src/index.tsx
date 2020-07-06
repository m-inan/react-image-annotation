import React from "react";
import Konva from "konva";
import { Stage } from "react-konva";

import { Map } from "./Map";
import { Regions } from "./regions";

import { store, useStore } from "./store";
import { Region, Point } from "./types";
import { getRelativePointerPosition } from "./utils";

export { store, useStore } from "./store";

interface Props {}

export const Annotation: React.FC<Props> = () => {
  const width = useStore((s) => s.width);
  const height = useStore((s) => s.height);
  const scale = useStore((s) => s.scale);

  const onClick = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedNotOnRegion = target.name() !== "region";

    if (clickedNotOnRegion) {
      const setSelected = store.getState().setSelected;

      setSelected(null);
    }
  };

  const onMouseDown = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = target.getStage();
    const { active, isDrawing } = store.getState();

    if (active && isDrawing && stage) {
      const { x, y } = getRelativePointerPosition(stage);

      const regions: Region[] = store.getState().regions;

      store.setState({
        regions: regions.map((item: Region) => {
          if (item.id === active) {
            const points = item.points;

            // increment point id
            const last: Point = points[points.length - 1];
            const increase = (last?.id ?? 0) + 1;

            item.points.push({
              x,
              y,
              id: increase,
            });
          }

          return item;
        }),
      });
    }
  };

  const onMouseMove = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = target.getStage();
    const { regions, active, isDrawing } = store.getState();

    let length =
      regions.find((item: Region) => item.id === active)?.points.length ?? 0;

    if (isDrawing && stage && length) {
      const { x, y } = getRelativePointerPosition(stage);
      const Line = stage.find(`#line-${active}`)[0] ?? null;
      // @ts-ignore
      const points = [...Line.points()];

      length *= 2;

      points[length] = x;
      points[length + 1] = y;

      // @ts-ignore
      Line.points([...points]);

      stage.batchDraw();
    }
  };

  return (
    <Stage
      width={width}
      height={height}
      scaleX={scale}
      scaleY={scale}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <Map />
      <Regions />
    </Stage>
  );
};
