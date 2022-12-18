import { Vector } from '@/vector';

export const getRandomInt = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const canvasToXy = (star: Vector) => {
  x = (x - window.centerMassVector.x) * window.zoom;
  y = (y - window.centerMassVector.y) * window.zoom;

  x = x + window.innerWidth / 2;
  y = y + window.innerHeight / 2;
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
