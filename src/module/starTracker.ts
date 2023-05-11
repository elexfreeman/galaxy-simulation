import { Vector } from '@/utils/vector';
import { Draw } from '@/utils/draw';

import { Stars } from '@/global/stars';

export const drawTrakingNet = (
  stars: Stars,
  wh: Vector,
  starIdx: number,
  _draw: Draw,
  step: number,
) => {
  const oxColor = 'rgb(200 255 174 / 15%)';

  const osXnav = new Vector(1, 0);
  const offsetButtom = wh.y / 5;
  let vecV = stars.getStarV(starIdx);
  const deg = Vector.angle2V(osXnav, vecV);
  const add = new Vector(0, offsetButtom);

  const center = Vector.multDigit(wh, 0.5);
  let dOsX1;
  let dOsX2;
  let dOsY1;
  let dOsY2;

  const addWH = 100;

  for (let k = 0; k < step; k++) {
    // OX
    dOsX1 = new Vector(-addWH, k * step + wh.x / 2);
    dOsX2 = new Vector(wh.x + addWH, k * step + wh.y / 2);
    dOsX1 = Vector.rotateVector(dOsX1, center, deg);
    dOsX2 = Vector.rotateVector(dOsX2, center, deg);
    dOsX1 = Vector.add(dOsX1, add);
    dOsX2 = Vector.add(dOsX2, add);

    _draw.line(dOsX1, dOsX2, oxColor);

    dOsX1 = new Vector(-addWH, wh.y / 2 - k * step);
    dOsX2 = new Vector(wh.x + addWH, wh.y / 2 - k * step);
    dOsX1 = Vector.rotateVector(dOsX1, center, deg);
    dOsX2 = Vector.rotateVector(dOsX2, center, deg);
    dOsX1 = Vector.add(dOsX1, add);
    dOsX2 = Vector.add(dOsX2, add);

    _draw.line(dOsX1, dOsX2, oxColor);

    // OY
    dOsY1 = new Vector(k * step + wh.x / 2, -addWH);
    dOsY2 = new Vector(k * step + wh.x / 2, wh.y + addWH);
    dOsY1 = Vector.rotateVector(dOsY1, center, deg);
    dOsY2 = Vector.rotateVector(dOsY2, center, deg);
    dOsY1 = Vector.add(dOsY1, add);
    dOsY2 = Vector.add(dOsY2, add);

    _draw.line(dOsY1, dOsY2, oxColor);

    dOsY1 = new Vector(wh.x / 2 - k * step, -addWH);
    dOsY2 = new Vector(wh.x / 2 - k * step, wh.y + addWH);
    dOsY1 = Vector.rotateVector(dOsY1, center, deg);
    dOsY2 = Vector.rotateVector(dOsY2, center, deg);
    dOsY1 = Vector.add(dOsY1, add);
    dOsY2 = Vector.add(dOsY2, add);

    _draw.line(dOsY1, dOsY2, oxColor);
  }
};
