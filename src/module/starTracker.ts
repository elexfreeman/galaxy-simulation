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
  stars: Stars,
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
    field = stars.dataArrWithField[k][2];
    vecXY = Vector.add(vecXY, new Vector(0, offsetButtom));

    _draw.rect(vecXY, new Vector(3, 3), getDotColorFromField(field));
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

export const drawTrakingNet = (stars: Stars, w, h, starIdx, ctx, step) => {
  if (!ctx) return;

  const oxColor = 'rgb(200 255 174 / 15%)';

  const osXnav = new Vector(1, 0);
  const offsetButtom = h / 5;
  let vecV = new Vector(stars.dataArr[starIdx][2], stars.dataArr[starIdx][3]);
  const deg = Vector.angle2V(osXnav, vecV);
  const add = new Vector(0, offsetButtom);

  const center = new Vector(w / 2, h / 2);
  let dOsX1;
  let dOsX2;
  let dOsY1;
  let dOsY2;

  const addWH = 100;

  for (let k = 0; k < step; k++) {
    // OX
    dOsX1 = new Vector(-addWH, k * step + h / 2);
    dOsX2 = new Vector(w + addWH, k * step + h / 2);
    dOsX1 = Vector.rotateVector(dOsX1, center, deg);
    dOsX2 = Vector.rotateVector(dOsX2, center, deg);
    dOsX1 = Vector.add(dOsX1, add);
    dOsX2 = Vector.add(dOsX2, add);

    ctx.beginPath();
    ctx.strokeStyle = oxColor;
    ctx.fillStyle = oxColor;
    ctx.moveTo(dOsX1.x, dOsX1.y);
    ctx.lineTo(dOsX2.x, dOsX2.y);
    ctx.closePath();
    ctx.stroke();

    dOsX1 = new Vector(-addWH, h / 2 - k * step);
    dOsX2 = new Vector(w + addWH, h / 2 - k * step);
    dOsX1 = Vector.rotateVector(dOsX1, center, deg);
    dOsX2 = Vector.rotateVector(dOsX2, center, deg);
    dOsX1 = Vector.add(dOsX1, add);
    dOsX2 = Vector.add(dOsX2, add);

    ctx.beginPath();
    ctx.strokeStyle = oxColor;
    ctx.fillStyle = oxColor;
    ctx.moveTo(dOsX1.x, dOsX1.y);
    ctx.lineTo(dOsX2.x, dOsX2.y);
    ctx.closePath();
    ctx.stroke();

    // OY
    dOsY1 = new Vector(k * step + w / 2, -addWH);
    dOsY2 = new Vector(k * step + w / 2, h + addWH);
    dOsY1 = Vector.rotateVector(dOsY1, center, deg);
    dOsY2 = Vector.rotateVector(dOsY2, center, deg);
    dOsY1 = Vector.add(dOsY1, add);
    dOsY2 = Vector.add(dOsY2, add);

    ctx.beginPath();
    ctx.strokeStyle = oxColor;
    ctx.fillStyle = oxColor;
    ctx.moveTo(dOsY1.x, dOsY1.y);
    ctx.lineTo(dOsY2.x, dOsY2.y);
    ctx.closePath();
    ctx.stroke();

    dOsY1 = new Vector(w / 2 - k * step, -addWH);
    dOsY2 = new Vector(w / 2 - k * step, h + addWH);
    dOsY1 = Vector.rotateVector(dOsY1, center, deg);
    dOsY2 = Vector.rotateVector(dOsY2, center, deg);
    dOsY1 = Vector.add(dOsY1, add);
    dOsY2 = Vector.add(dOsY2, add);

    ctx.beginPath();
    ctx.strokeStyle = oxColor;
    ctx.fillStyle = oxColor;
    ctx.moveTo(dOsY1.x, dOsY1.y);
    ctx.lineTo(dOsY2.x, dOsY2.y);
    ctx.closePath();
    ctx.stroke();
  }
};
