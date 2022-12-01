export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }

  static minus(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }

  static addScalar(d) {
    return new Vector(this.x + d, this.y + d);
  }

  static mult(v1, v2) {
    return new Vector(v1.x * v2.x, v1.y * v2.y)
  }

  static length(v) {
    return Math.sqrt((v.x * v.x) + (v.y * v.y));
  }
}
