(function() {
  "use strict";
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static fromVector(v) {
      return new Vector(v.x, v.y);
    }
    static add(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static minus(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static addScalar(v, d) {
      return new Vector(v.x + d, v.y + d);
    }
    static mult(v1, v2) {
      return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
    static multDigit(v1, d) {
      return new Vector(v1.x * d, v1.y * d);
    }
    static len(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    static rotateVector(vec, centerVec, angle) {
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const vecOut = new Vector(vec.x, vec.y);
      vecOut.x -= centerVec.x;
      vecOut.y -= centerVec.y;
      const xnew = vecOut.x * c - vecOut.y * s;
      const ynew = vecOut.x * s + vecOut.y * c;
      vecOut.x = xnew + centerVec.x;
      vecOut.y = ynew + centerVec.y;
      return vecOut;
    }
    static angle2V(w, v) {
      return Math.atan2(w.y * v.x - w.x * v.y, w.x * v.x + w.y * v.y);
    }
    static getMin(point1, point2) {
      const minX = point1.x <= point2.x ? point1.x : point2.x;
      const minY = point1.y <= point2.y ? point1.y : point2.y;
      return new Vector(minX, minY);
    }
    static getMax(point1, point2) {
      const maxX = point1.x > point2.x ? point1.x : point2.x;
      const maxY = point1.y > point2.y ? point1.y : point2.y;
      return new Vector(maxX, maxY);
    }
  }
  const DATA_X = 0;
  const DATA_Y = 1;
  const DATA_VX = 2;
  const DATA_VY = 3;
  const DATA_FIELD = 2;
  class Stars {
    constructor() {
      this.zoom = 1;
      this.maxField = 0;
      this.dataArr = [];
      this.dataArrWithField = [];
      this.centerMassVector = new Vector(0, 0);
      this.isPause = false;
    }
    getCount() {
      return this.dataArr.length;
    }
    getStarXY(starIdx) {
      return new Vector(this.dataArr[starIdx][DATA_X], this.dataArr[starIdx][DATA_Y]);
    }
    getStarV(starIdx) {
      return new Vector(this.dataArr[starIdx][DATA_VX], this.dataArr[starIdx][DATA_VY]);
    }
    getField(starIdx) {
      if (this.dataArrWithField[starIdx])
        return this.dataArrWithField[starIdx][DATA_FIELD];
      return 0;
    }
    addStar(coord, speed) {
      this.dataArr.push([coord.x, coord.y, speed.x, speed.y]);
      this.dataArrWithField.push([coord.x, coord.y, 0]);
    }
  }
  new Stars();
  onmessage = function(e) {
    const { dataArr } = e.data;
    const getCenterMassVector = () => {
      let startWorker = new Date();
      const count = dataArr.length;
      let centerMassVectorXY = new Vector(0, 0);
      let maxField = 0;
      for (let k = 0; k < dataArr.length; k++) {
        centerMassVectorXY = Vector.add(centerMassVectorXY, new Vector(dataArr[k][DATA_X], dataArr[k][DATA_Y]));
        if (dataArr[k][DATA_FIELD] > maxField) {
          maxField = dataArr[k][DATA_FIELD];
        }
      }
      centerMassVectorXY = Vector.multDigit(centerMassVectorXY, 1 / count);
      const workerFps = new Date() - startWorker;
      return {
        centerMassVectorXY,
        maxField,
        workerFps
      };
    };
    postMessage(getCenterMassVector());
  };
})();
