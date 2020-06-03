import React, { useEffect } from "react";
import { Layer, Image } from "react-konva";
import useImage from "use-image";

import { useStore } from "./store";

interface Props {
  source: string;
}

export const Map: React.FC<Props> = ({ source }: Props) => {
  // need the image source
  const [image] = useImage(source);

  const setReady = useStore((s) => s.setReady);

  useEffect(() => {
    if (image) {
      setReady(true);
    }
  }, [image]);

  return (
    <Layer>
      <Image image={image} />
    </Layer>
  );
};
