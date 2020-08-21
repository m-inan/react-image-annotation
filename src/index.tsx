import React, { useRef } from "react";
import Konva from "konva";
import { Stage } from "react-konva";

import { Map } from "./Map";
import { Regions } from "./regions";

import { store, useStore } from "./store";
import { Region, Point } from "./types";
import { getRelativePointerPosition, zoomStage } from "./utils";

export { store, useStore } from "./store";

interface Props {}

const { min, max } = Math;

export const Annotation: React.FC<Props> = () => {
  let _stage = useRef<any>(null);
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
    const { width, height } = store.getState().dimension;

    if (active && isDrawing && stage) {
      let { x, y } = getRelativePointerPosition(stage);

      const regions: Region[] = store.getState().regions;

      store.setState({
        regions: regions.map((item: Region) => {
          if (item.id === active) {
            const points = item.points;

            // border of the frame
            y = y < 0 ? 0 : y > height ? height : y;
            x = x < 0 ? 0 : x > width ? width : x;

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

  const onWheel = (event: Konva.KonvaEventObject<MouseWheelEvent>) => {
    zoomStage(event, store.getState().scale);
  };

  // Drag corner limit
  const dragBoundFunc = (pos: Konva.Vector2d) => {
    const stage: any = _stage.current;
    let { x, y } = pos;

    if (stage) {
      const box = stage.findOne("Image").getClientRect();
      const minX = -box.width + stage.width();
      const maxX = 0;

      x = max(minX, min(pos.x, maxX));

      const minY = -box.height + stage.height();
      const maxY = 0;

      y = max(minY, min(pos.y, maxY));
    }
    return {
      x,
      y,
    };
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const { active, setDrawing } = store.getState();

    if (event.keyCode === 16 && active) {
      setDrawing(true);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const { isDrawing, setDrawing } = store.getState();

    // when pressed shift key stop drawing
    // and drag screen position
    if (event.keyCode === 16 && isDrawing) {
      setDrawing(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <Stage
      draggable
      ref={_stage}
      width={width}
      height={height}
      scaleX={scale}
      scaleY={scale}
      onClick={onClick}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      dragBoundFunc={dragBoundFunc}
    >
      <Map />
      <Regions />
    </Stage>
  );
};
