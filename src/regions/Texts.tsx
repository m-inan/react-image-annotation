import React, { Fragment } from "react";
import { Text as KonvaText } from "react-konva";

import { Text } from "../types";
import { useStore } from "../store";

interface Props {
  texts: Text[];
}

export const Texts: React.FC<Props> = ({ texts }: Props) => {
  const { width, height } = useStore((s) => s.dimension);
  const calc = (size: number) => ((width + height) / 2) * (size / 1000);

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
            fontSize={calc(size || 0)}
            draggable={true}
            rotation={rotation}
          />
        )
      )}
    </Fragment>
  );
};
