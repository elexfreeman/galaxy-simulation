export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromVector(v) {
    return new Vector(v.x, v.y);
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

  static multDigit(v1, d) {
    return new Vector(v1.x * d, v1.y * d)
  }

  static length(v) {
    return Math.sqrt((v.x * v.x) + (v.y * v.y));
  }
  //
  //https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
  static rotateVector(vec, centerVec, angle) {
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

  static angle2V(w, v) {
    return Math.atan2(w.y * v.x - w.x * v.y, w.x * v.x + w.y * v.y);
  }
}

