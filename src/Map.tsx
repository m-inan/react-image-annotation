import React from "react";
import { Layer, Image } from "react-konva";
import useImage from "use-image";

interface Props {
  source: string;
}

export const Map: React.FC<Props> = ({ source }: Props) => {
  // need the image source
  const [image] = useImage(source);

  return (
    <Layer>
      <Image image={image} />
    </Layer>
  );
};
