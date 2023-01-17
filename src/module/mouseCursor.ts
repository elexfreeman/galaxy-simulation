import { elem, mouseCoord } from '@/global/draw';
import { Vector } from '@/utils/vector';

export interface IMouseRect {
  point1: Vector;
  point2: Vector;
}

export const mouseCoordInit = () => {
  elem.onmousemove = (event) => {
    mouseCoord.x = event.x;
    mouseCoord.y = event.y;
  };
};
