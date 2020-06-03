import React from "react";
import { Layer } from "react-konva";

import { useStore } from "../store";
import { Region } from "../types";

import { Shape } from "./Shape";

interface Props {}

export const Regions: React.FC<Props> = () => {
  const regions = useStore<Region[]>((s) => s.regions);
  const isReady = useStore<boolean>((s) => s.isReady);

  // wait for image loading
  if (!isReady) {
    return null;
  }

  return (
    <Layer>
      {regions.map((region: Region, key: number) => (
        <Shape key={key} region={region} />
      ))}
    </Layer>
  );
};
