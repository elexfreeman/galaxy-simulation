import { Vector } from '@/vector';
import stars from '@/global/stars';
import { canvasToXy } from '@/utils/common';
import { draw } from '@/global/draw';

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
