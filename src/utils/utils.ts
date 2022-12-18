import {Vector} from "../vector";

export const getRandomInt = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

export const canvasToXy = () => {

}

export const xyToCanvas = (point: Vector, zoom: number, centerMassVector: Vector, vh: Vector): Vector => {
  return Vector.add(
    Vector.multDigit(
      Vector.minus(point, centerMassVector), zoom
    ),
    Vector.multDigit(vh, 0.5)
  );
}

export const radToDeg = (rad: number): number => {
  return rad * 180 / 3.14;
}
