import { Vector } from '@/vector';
import stars from '@/global/stars';
import { canvasToXy } from '@/utils/common';
import { draw } from '@/global/draw';

export const getDefaultCoord = (): Vector => {
  const vh = draw.getVH();
  const coordScreen = new Vector(vh.x / 2, vh.y - vh.y / 4);
  return canvasToXy(coordScreen, stars.centerMassVector, stars.zoom, vh);
};

export class Player {
  protected idx = -1;
  protected rot: Vector;
  protected driveSpeed: number = 1;

  constructor() {
    const coord = getDefaultCoord();
    stars.addStar(coord, new Vector(0, 0));
    this.idx = stars.getCount();
    this.rot = new Vector(0, 0.1);
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

  rotate(angle: number) {
    this.rot = Vector.rotateVector(this.rot, new Vector(0, 0), angle);
  }

  power() {
    this.setVelocity(Vector.add(this.getVelocity(), this.rot));
  }
}
