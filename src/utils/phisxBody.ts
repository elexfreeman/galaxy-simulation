import { Vector } from './vector';

export class PhisixBody {
  public coord: Vector;
  public speed: Vector;
  public massa: number;

  constructor(coord: Vector, speed: Vector, massa = 1) {
    this.speed = speed;
    this.coord = coord;
    this.massa = massa;
  }
}
