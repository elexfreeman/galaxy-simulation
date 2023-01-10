export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromVector(v: Vector) {
    return new Vector(v.x, v.y);
  }

  static add(v1: Vector, v2: Vector) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static minus(v1: Vector, v2: Vector) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static addScalar(v: Vector, d: number) {
    return new Vector(v.x + d, v.y + d);
  }

  static mult(v1: Vector, v2: Vector) {
    return new Vector(v1.x * v2.x, v1.y * v2.y);
  }

  static multDigit(v1: Vector, d: number) {
    return new Vector(v1.x * d, v1.y * d);
  }

  static len(v: Vector) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  //
  //https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
  static rotateVector(vec: Vector, centerVec: Vector, angle: number): Vector {
    //    const angle = angleDeg * 3.14 / 180;
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    const vecOut = new Vector(vec.x, vec.y);
    // translate point back to origin:
    vecOut.x -= centerVec.x;
    vecOut.y -= centerVec.y;

    // rotate point
    const xnew = vecOut.x * c - vecOut.y * s;
    const ynew = vecOut.x * s + vecOut.y * c;

    // translate point back:
    vecOut.x = xnew + centerVec.x;
    vecOut.y = ynew + centerVec.y;
    return vecOut;
  }

  static angle2V(w: Vector, v: Vector) {
    return Math.atan2(w.y * v.x - w.x * v.y, w.x * v.x + w.y * v.y);
  }

  static getMin(point1: Vector, point2: Vector): Vector {
    const minX = point1.x <= point2.x ? point1.x : point2.x;
    const minY = point1.y <= point2.y ? point1.y : point2.y;
    return new Vector(minX, minY);
  }

  static getMax(point1: Vector, point2: Vector): Vector {
    const maxX = point1.x > point2.x ? point1.x : point2.x;
    const maxY = point1.y > point2.y ? point1.y : point2.y;
    return new Vector(maxX, maxY);
  }
}
