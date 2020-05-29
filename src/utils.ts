import Konva from "konva";

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
