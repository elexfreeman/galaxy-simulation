import {Vector} from '@/vector';
import {xyToCanvas, radToDeg} from '@/utils/utils';
import {getDotColorFromField} from '@/utils/gradient';

export class StarTrackerState {
  static default = 0;
  static startSelect = 1;
}

export const starTrackerInit = () => {
  window.starTrackerState = StarTrackerState.default;
  window.mouseRect = {
    x1: 0, y1: 0,
    x2: 0, y2: 0,
  }
}

export const drawMouseRect = () => {
  const {x1, x2, y1, y2} = window.mouseRect;
  if (x1 == x2 == y1 == y2) return;

  const ctx = window.canvasElem.ctx;
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(
    x2, y2,
    x1 - x2 - 20, y1 - y2 - 20
  )
  ctx.closePath();
  ctx.stroke();
}

export const getStarFromRect = () => {
  const {x1, x2, y1, y2} = window.mouseRect;
  let star = null;

  const minX = x1 <= x2 ? x1 : x2;
  const minY = y1 <= y2 ? y1 : y2;

  const maxX = x1 > x2 ? x1 : x2;
  const maxY = y1 > y2 ? y1 : y2;

  for (let k = 0; k < window.dataArr.length; k++) {
    let x = window.dataArr[k][0];
    let y = window.dataArr[k][1];

    x = (x - window.centerMassVector.x) * window.zoom;
    y = (y - window.centerMassVector.y) * window.zoom;

    x = x + window.innerWidth / 2;
    y = y + window.innerHeight / 2;

    const isInRect = x > minX && x < maxX && y > minY && y < maxY;

    if (isInRect) {
      star = k;
      break;
    }

  }

  return star;
}

export const getStartsFromRect = () => {
  const {x1, x2, y1, y2} = window.mouseRect;
  const starList = [];

  const minX = x1 <= x2 ? x1 : x2;
  const minY = y1 <= y2 ? y1 : y2;

  const maxX = x1 > x2 ? x1 : x2;
  const maxY = y1 > y2 ? y1 : y2;

  for (let k = 0; k < window.dataArr.length; k++) {
    let x = window.dataArr[k][0];
    let y = window.dataArr[k][1];

    x = (x - window.centerMassVector.x) * window.zoom;
    y = (y - window.centerMassVector.y) * window.zoom;

    x = x + window.innerWidth / 2;
    y = y + window.innerHeight / 2;

    const isInRect = x > minX && x < maxX && y > minY && y < maxY;

    if (isInRect) starList.push(k);

  }

  return starList;
}

export class StarTracker {
  constructor(starList) {
    this.starList = starList;

  }
}

export const drawTraking = (w, h, zoom, starIdx, ctx, image, color) => {
  if (!ctx) return;

  const osX = new Vector(1, 0);
  const offset = new Vector(w / 2, h / 2);
  const offsetButtom = h / 5;
  const centerMassVector = new Vector(window.dataArr[starIdx][0], window.dataArr[starIdx][1]);
  let vecV = new Vector(window.dataArr[starIdx][2], window.dataArr[starIdx][3]);
  let vecXY = new Vector(0, 0);
  const deg = Vector.angle2V(osX, vecV);
  let field = 0;

  for (let k = 0; k < window.dataArrWithField.length; k++) {
    vecXY.x = window.dataArr[k][0];
    vecXY.y = window.dataArr[k][1];
    vecXY = Vector.rotateVector(vecXY, centerMassVector, deg - 3.14 / 2);
    vecXY = Vector.minus(vecXY, centerMassVector);
    vecXY = Vector.multDigit(vecXY, zoom);
    vecXY = Vector.add(vecXY, offset);
    field = window.dataArrWithField[k][2];
    vecXY = Vector.add(vecXY, new Vector(0, offsetButtom));

    ctx.beginPath();
    ctx.fillStyle = getDotColorFromField(field);
    ctx.fillRect(vecXY.x, vecXY.y, 3, 3);
    ctx.closePath();
    ctx.stroke();
  }

  // drawImage 
  const ship = new Vector(w / 2, h - offsetButtom - 40);
  if (image) {
    ctx.drawImage(image, ship.x - 8, ship.y, 15, 25);
  }

  // global map target
  const rectXY = xyToCanvas(
    centerMassVector.x - 10,
    centerMassVector.y - 10,
    window.zoom,
    window.centerMassVector,
    window.innerWidth,
    window.innerHeight,
  );

  window.canvasElem.ctx.beginPath();
  window.canvasElem.ctx.strokeStyle = color;
  window.canvasElem.ctx.strokeRect(rectXY.dx, rectXY.dy, 20, 20);
  window.canvasElem.ctx.closePath();
  window.canvasElem.ctx.stroke();

  // vector velocity
  vecV = Vector.multDigit(vecV, 100);
  window.canvasElem.ctx.beginPath();
  window.canvasElem.ctx.strokeStyle = color;
  window.canvasElem.ctx.fillStyle = color;
  window.canvasElem.ctx.lineTo(rectXY.dx + 10, rectXY.dy + 10);
  window.canvasElem.ctx.lineTo(rectXY.dx + vecV.x, rectXY.dy + vecV.y);
  window.canvasElem.ctx.closePath();
  window.canvasElem.ctx.stroke();

}

export const drawTrakingNet = (w, h, starIdx, ctx, step) => {
  if (!ctx) return;

  const oxColor = 'rgb(200 255 174 / 15%)';

  const osXnav = new Vector(1, 0);
  const offsetButtom = h / 5;
  let vecV = new Vector(window.dataArr[starIdx][2], window.dataArr[starIdx][3]);
  const deg = Vector.angle2V(osXnav, vecV);
  const add = new Vector(0, offsetButtom)

  const center = new Vector(w / 2, h / 2);
  let dOsX1;
  let dOsX2;
  let dOsY1;
  let dOsY2;

  const addWH = 100;

  for (let k = 0; k < step; k++) {

    // OX
    dOsX1 = new Vector(-addWH, (k * step) + h / 2);
    dOsX2 = new Vector(w + addWH, (k * step) + h / 2);
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

    dOsX1 = new Vector(-addWH, (h / 2) - (k * step));
    dOsX2 = new Vector(w + addWH, (h / 2) - (k * step));
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
    dOsY1 = new Vector((k * step) + (w / 2), -addWH);
    dOsY2 = new Vector((k * step) + (w / 2), h + addWH);
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

    dOsY1 = new Vector((w / 2) - (k * step), -addWH);
    dOsY2 = new Vector((w / 2) - (k * step), h + addWH);
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
}
