import React, { Fragment } from "react";
import Konva from "konva";
import { Text as KonvaText } from "react-konva";

import { Text } from "../types";
import { store } from "../store";
import { calcProportion } from "../utils";

interface Props {
  texts: Text[];
}

const { min, max } = Math;

export const Texts: React.FC<Props> = ({ texts }: Props) => {
  const onDragMove = ({ target }: Konva.KonvaEventObject<MouseEvent>) => {
    const { width, height } = store.getState().dimension;

    let x: number = target.x();
    let y: number = target.y();

    const offsetX = target.width() / 2;
    const offsetY = target.height() / 2;

    console.log(x, width);

    y = max(-offsetY, min(height - offsetY, y));
    x = max(-offsetX, min(width - offsetX, x));

    if (target.y() !== y) {
      target.y(y);
    }
    if (target.x() !== x) {
      target.x(x);
    }
  };

  return (
    <Fragment>
      {texts.map(
        ({ x, y, value, color, size, rotation }: Text, key: number) => (
          <KonvaText
            x={x}
            y={y}
            key={key}
            fill={color}
            text={value}
            fontSize={calcProportion(size || 0)}
            draggable={true}
            rotation={rotation}
            onDragMove={onDragMove}
          />
        )
      )}
    </Fragment>
  );
};
