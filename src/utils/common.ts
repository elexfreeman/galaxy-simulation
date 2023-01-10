import { Vector } from '@/vector';

export const getRandomInt = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const canvasToXy = (
  point: Vector,
  centerMassVector: Vector,
  zoom: number,
  vh: Vector,
): Vector => {
  // (point - centerMassVector) * zoom - vh * 0.5
  return Vector.minus(
    Vector.multDigit(Vector.minus(point, centerMassVector), zoom),
    Vector.multDigit(vh, 0.5),
  );
};

export const xyToCanvas = (
  point: Vector,
  zoom: number,
  centerMassVector: Vector,
  vh: Vector,
): Vector => {
  // (point - centerMassVector) * zoom + vh * 0.5
  return Vector.add(
    Vector.multDigit(Vector.minus(point, centerMassVector), zoom),
    Vector.multDigit(vh, 0.5),
  );
};

export const radToDeg = (rad: number): number => {
  return (rad * 180) / 3.14;
};

export const degToRad = (deg: number): number => {
  return (deg * 3.14) / 180;
};

export const inRect = (
  recPoint1: Vector,
  rectPoint2: Vector,
  point: Vector,
) => {
  const min = Vector.getMin(recPoint1, rectPoint2);
  const max = Vector.getMax(recPoint1, rectPoint2);
  const isInRect =
    point.x > min.x && point.x < max.x && point.y > min.y && point.y < max.y;

  return isInRect;
};
