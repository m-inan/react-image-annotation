import React from "react";
import { Layer, Image } from "react-konva";
import useImage from "use-image";

interface Props {}

export const Map: React.FC<Props> = () => {
  // need the image source
  const [image] = useImage("");

  return (
    <Layer>
      <Image image={image} />
    </Layer>
  );
};
