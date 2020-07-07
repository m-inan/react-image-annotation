import Konva from "konva";

import { store } from "./store";

const { min, max } = Math;

export function getRelativePointerPosition(node: Konva.Stage): Konva.Vector2d {
  // the function will return pointer position relative to the passed node
  const transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  const pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos ?? { x: 0, y: 0 });
}

export function calcProportion(size: number): number {
  const { width, height } = store.getState().dimension;

  const result = ((width + height) / 2) * (size / 1000);

  return result;
}

export function limitAttributes(
  stage: Konva.Stage,
  newAttrs: any,
  minScale: number
) {
  const box = stage.findOne("Image").getClientRect();
  const minX = -box.width + stage.width();
  const maxX = 0;

  const x = max(minX, min(newAttrs.x, maxX));

  const minY = -box.height + stage.height();
  const maxY = 0;

  const y = max(minY, min(newAttrs.y, maxY));

  const scale = max(minScale, newAttrs.scale);

  return { x, y, scale };
}

export function zoomTransformSize(stage: any) {
  // Transform rect update size
  stage.find("Transformer").forceUpdate();

  // get interveted scale
  let size = calcProportion(15);

  // set width and scale shape rect
  stage.find(".region-rect").forEach((item: Konva.Node) => {
    item.setAttrs({
      width: size,
      height: size,
      offset: {
        x: size / 2,
        y: size / 2,
      },
    });
  });

  // set radius starter circle
  size = calcProportion(10);

  stage.find(".region-circle").forEach((item: Konva.Node) => {
    item.setAttrs({
      radius: size,
    });
  });
}

export function zoomStage(
  event: Konva.KonvaEventObject<WheelEvent>,
  minScale: number
) {
  const { target, evt } = event;

  evt.preventDefault();

  const scaleBy = 1.06;
  const stage = target.getStage();

  if (stage) {
    const oldScale = stage.scaleX();

    const position = stage.getPointerPosition() ?? { x: 0, y: 0 };

    const mousePointTo = {
      x: position.x / oldScale - stage.x() / oldScale,
      y: position.y / oldScale - stage.y() / oldScale,
    };

    let newScale = evt?.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const newPos = {
      x: -(mousePointTo.x - position.x / newScale) * newScale,
      y: -(mousePointTo.y - position.y / newScale) * newScale,
    };

    const newAttrs = limitAttributes(
      stage,
      { ...newPos, scale: newScale },
      minScale
    );

    stage.to({
      x: newAttrs.x,
      y: newAttrs.y,
      scaleX: newAttrs.scale,
      scaleY: newAttrs.scale,
      duration: 0,
      easing: Konva.Easings["EaseOut"],
    });

    zoomTransformSize(stage);

    stage.batchDraw();
  }
}
