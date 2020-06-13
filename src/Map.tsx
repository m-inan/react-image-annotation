import React, { useEffect } from "react";
import { Layer, Image } from "react-konva";
import useImage from "use-image";

import { useStore } from "./store";

interface Props {}

export const Map: React.FC<Props> = () => {
  // need the image source

  const source = useStore((s) => s.source);

  const [image] = useImage(source);

  const width = useStore((s) => s.width);

  const setReady = useStore((s) => s.setReady);
  const setScale = useStore((s) => s.setScale);
  const setWidth = useStore((s) => s.setWidth);
  const setHeight = useStore((s) => s.setHeight);
  const setDimension = useStore((s) => s.setDimension);

  useEffect(() => {
    if (image) {
      const ratio = image.width / image.height;
      const height = width / ratio;

      const scale = Math.min(width / image.width, height / image.height);

      setScale(scale);

      setWidth(width);
      setHeight(height);

      setDimension({ width: image.width, height: image.height });
      setReady(true);
    }
  }, [image, width]);

  return (
    <Layer>
      <Image image={image} />
    </Layer>
  );
};
