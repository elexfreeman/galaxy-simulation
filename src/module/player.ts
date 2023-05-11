import { Vector } from '@/utils/vector';
import { Draw } from '@/utils/draw';
import { xyToCanvas } from '@/utils/common';
import { getDotColorFromField } from '@/utils/gradient';

import stars from '@/global/stars';

export const getDefaultCoord = (): Vector => {
  return new Vector(0, 200);
};

export const PLAYER_SPEED_MULTIPLY = 0.01;

export class Player {
  protected idx = -1;
  protected rot: Vector;
  protected driveSpeed: number = 1;
  protected isPower: boolean = false;

  constructor() {
    const coord = getDefaultCoord();
    stars.addStar(coord, new Vector(0, 0));
    this.idx = stars.getCount() - 1;
    this.rot = new Vector(0, PLAYER_SPEED_MULTIPLY);
  }

  protected setVelocity(v: Vector) {
    return stars.setStarV(this.idx, v);
  }

  getCoord(): Vector {
    return stars.getStarXY(this.idx);
  }

  getVelocity(): Vector {
    return stars.getStarV(this.idx);
  }

  getRot(): Vector {
    return this.rot;
  }

  getIdx() {
    return this.idx;
  }

  setRot(rot: Vector) {
    this.rot = { ...rot };
  }

  rotate(angle: number) {
    this.rot = Vector.rotateVector(this.rot, new Vector(0, 0), angle);
  }

  power() {
    this.setVelocity(Vector.add(this.getVelocity(), this.rot));
  }

  powerOn() {
    this.isPower = true;
  }

  powerOff() {
    this.isPower = false;
  }

  tick() {
    if (this.isPower) {
      this.power();
    }
  }
}

export const drawShip = (vh: Vector, _draw: Draw, image: any) => {
  const offsetButtom = vh.y / 5;
  const ship = new Vector(vh.x / 2, vh.y - offsetButtom - 40);
  if (image) {
    _draw.ctx.drawImage(image, ship.x - 8, ship.y, 15, 25);
  }
};

export const drawPlayerV = (
  playerCoord: Vector,
  playerV: Vector,
  _draw: Draw,
  color: string,
) => {
  //  const playerCoordCanvas = xyToCanvas(
  //    playerCoord,
  //    stars.zoom,
  //    stars.centerMassVector,
  //    _draw.getVH(),
  //  );
  //

  // vector velocity
  _draw.line(
    playerCoord,
    Vector.add(playerCoord, Vector.multDigit(playerV, 100)),
    color,
  );
  // vector velocity
};

export const drawPlayerRect = (
  playerCoord: Vector,
  _draw: Draw,
  color: string,
) => {
  //  const playerCoordCanvas = xyToCanvas(
  //    playerCoord,
  //    stars.zoom,
  //    stars.centerMassVector,
  //    _draw.getVH(),
  //  );

  _draw.rect(Vector.addScalar(playerCoord, -10), new Vector(20, 20), color);
};

export const drawPlayerPower = (
  playerCoord: Vector,
  mouseCoord: Vector,
  _draw: Draw,
  color: string,
) => {
  _draw.line(playerCoord, mouseCoord, color);
};

export const drawPlayerRot = (
  vh: Vector,
  _draw: Draw,
  color: string,
  rot: Vector,
) => {
  const offsetButtom = vh.y / 5;

  const ship = new Vector(vh.x / 2, vh.y - offsetButtom - 40);
  _draw.line(ship, Vector.add(ship, Vector.multDigit(rot, 500)), color);
};

export const drawPlayerTraking = (
  vh: Vector,
  zoom: number,
  starIdx: number,
  _draw: Draw,
) => {
  const osX = new Vector(1, 0);
  const offset = Vector.multDigit(vh, 0.5);
  const offsetButtom = vh.y / 5;
  const trackObject = stars.getStarXY(starIdx);

  let vecV = stars.getStarV(starIdx);
  let vecXY = new Vector(0, 0);
  const deg = Vector.angle2V(osX, vecV);
  let field = 0;

  for (let k = 0; k < stars.getCount(); k++) {
    vecXY = stars.getStarXY(k);
    vecXY = Vector.rotateVector(vecXY, trackObject, deg - 3.14 / 2);
    vecXY = Vector.minus(vecXY, trackObject);
    vecXY = Vector.multDigit(vecXY, zoom);
    vecXY = Vector.add(vecXY, offset);
    field = stars.getField(k);
    vecXY = Vector.add(vecXY, new Vector(0, offsetButtom));

    _draw.rect(
      vecXY,
      new Vector(3, 3),
      getDotColorFromField(field, stars.maxField),
      true,
    );
  }
};
