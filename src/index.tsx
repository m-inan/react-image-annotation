import React, { useRef, useEffect } from "react";
import Konva from "konva";
import { Stage } from "react-konva";

import { Map } from "./Map";
import { Regions } from "./regions";

import { store } from "./store";
import { Region, Point } from "./types";
import { getRelativePointerPosition } from "./utils";

interface Props {
  width: number;
  height: number;
  source: string;
}

export const Annotation: React.FC<Props> = ({
  width,
  height,
  source,
}: Props) => {
  const _stage = useRef(null);

  // create example region
  useEffect(() => {
    store.setState({
      regions: [
        {
          id: 1,
          closed: false,
          points: [],
          texts: [],
        },
      ],
    });
  }, []);

  const onMouseDown = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = target.getStage();

    if (stage) {
      const { x, y } = getRelativePointerPosition(stage);

      const regions: Region[] = store.getState().regions;

      store.setState({
        regions: regions.map((item: Region) => {
          const points = item.points;

          const last: Point = points[points.length - 1];

          const increase = last?.id ?? 1;

          item.points.push({
            x,
            y,
            id: increase,
          });

          return item;
        }),
      });
    }
  };

  return (
    <Stage ref={_stage} width={width} height={height} onMouseDown={onMouseDown}>
      <Map source={source} />
      <Regions />
    </Stage>
  );
};
