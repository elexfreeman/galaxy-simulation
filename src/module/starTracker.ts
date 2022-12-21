import { Vector } from '@/vector';
import { xyToCanvas, canvasToXy } from '@/utils/utils';
import { getDotColorFromField } from '@/utils/gradient';
import { draw } from '@/global/draw';
import { Stars } from '@/global/stars';
import { IMouseRect } from './mouseCursor';
import stars from '@/global/stars';
import { Draw } from '@/utils/draw';

export const mouseRect: IMouseRect = {
  point1: new Vector(0, 0),
  point2: new Vector(0, 0),
};

export const starTrackerInit = () => {};

export const drawMouseRect = () => {
  const { point1, point2 } = mouseRect;

  // point1 - point2 - 20
  draw.rect(
    point2,
    Vector.addScalar(Vector.minus(point1, point2), -20),
    'green',
  );
};

export const getStarFromRect = (): number => {
  const { point1, point2 } = mouseRect;
  let out = -1;

  const min = Vector.getMin(point1, point2);
  const max = Vector.getMax(point1, point2);

  for (let k = 0; k < stars.dataArr.length; k++) {
    const star = canvasToXy(
      stars.getStarXY(k),
      stars.centerMassVector,
      stars.zoom,
      draw.getVH(),
    );

    const isInRect =
      star.x > min.x && star.x < max.x && star.y > min.y && star.y < max.y;

    if (isInRect) {
      out = k;
      break;
    }
  }

  return out;
};

//export const getStartsFromRect = (stars: Stars, mouseRect: IMouseRect) => {
//  const starList = [];
//
//  const minX =
//    mouseRect.point1.x <= mouseRect.point2.x
//      ? mouseRect.point1.x
//      : mouseRect.point2.x;
//  const minY =
//    mouseRect.point1.y <= mouseRect.point2.y
//      ? mouseRect.point1.y
//      : mouseRect.point2.y;
//
//  const maxX =
//    mouseRect.point1.x > mouseRect.point2.x
//      ? mouseRect.point1.x
//      : mouseRect.point2.x;
//  const maxY =
//    mouseRect.point1.y > mouseRect.point2.y
//      ? mouseRect.point1.y
//      : mouseRect.point2.y;
//
//  for (let k = 0; k < stars.dataArr.length; k++) {
//    const star = stars.getStarXY(k);
//
//    x = (x - window.centerMassVector.x) * window.zoom;
//    y = (y - window.centerMassVector.y) * window.zoom;
//
//    x = x + window.innerWidth / 2;
//    y = y + window.innerHeight / 2;
//
//    const isInRect = x > minX && x < maxX && y > minY && y < maxY;
//
//    if (isInRect) starList.push(k);
//  }
//
//  return starList;
//};

export const drawTraking = (
  vh: Vector,
  zoom: number,
  starIdx: number,
  _draw: Draw,
  image: any,
  color: string,
) => {
  const osX = new Vector(1, 0);
  const offset = Vector.multDigit(vh, 0.5);
  const offsetButtom = vh.y / 5;
  const centerMassVector = stars.getStarXY(starIdx);

  let vecV = stars.getStarV(starIdx);
  let vecXY = new Vector(0, 0);
  const deg = Vector.angle2V(osX, vecV);
  let field = 0;

  for (let k = 0; k < stars.getCount(); k++) {
    vecXY = stars.getStarXY(k);
    vecXY = Vector.rotateVector(vecXY, centerMassVector, deg - 3.14 / 2);
    vecXY = Vector.minus(vecXY, centerMassVector);
    vecXY = Vector.multDigit(vecXY, zoom);
    vecXY = Vector.add(vecXY, offset);
    field = stars.getField(k);
    vecXY = Vector.add(vecXY, new Vector(0, offsetButtom));

    _draw.rect(
      vecXY,
      new Vector(3, 3),
      getDotColorFromField(field, stars.maxField),
    );
  }

  // drawImage
  const ship = new Vector(vh.x / 2, vh.y - offsetButtom - 40);
  if (image) {
    _draw.ctx.drawImage(image, ship.x - 8, ship.y, 15, 25);
  }

  // global map target
  const rectXY = xyToCanvas(
    Vector.addScalar(centerMassVector, -10),
    stars.zoom,
    stars.centerMassVector,
    draw.getVH(),
  );

  draw.rect(rectXY, new Vector(20, 20), color);

  // vector velocity
  vecV = Vector.multDigit(vecV, 100);
  draw.line(Vector.addScalar(rectXY, 10), Vector.add(rectXY, vecV), color);
};

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
