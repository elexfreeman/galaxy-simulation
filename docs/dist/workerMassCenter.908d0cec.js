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
    static addScalar(d) {
      return new Vector(this.x + d, this.y + d);
    }
    static mult(v1, v2) {
      return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
    static multDigit(v1, d) {
      return new Vector(v1.x * d, v1.y * d);
    }
    static length(v) {
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
  }
  onmessage = function(e) {
    const {
      dataArr,
      test
    } = e.data;
    const getCenterMassVector = () => {
      let startWorker = new Date();
      const count = dataArr.length;
      const centerMassVectorXY = new Vector(0, 0);
      let maxField = 0;
      for (let k = 0; k < dataArr.length; k++) {
        centerMassVectorXY.x += dataArr[k][0];
        centerMassVectorXY.y += dataArr[k][1];
        if (dataArr[k][2] > maxField) {
          maxField = dataArr[k][2];
        }
      }
      centerMassVectorXY.x = centerMassVectorXY.x / count;
      centerMassVectorXY.y = centerMassVectorXY.y / count;
      let workerFps = new Date() - startWorker;
      if (test) {
        console.log(centerMassVectorXY);
      }
      return {
        centerMassVectorXY,
        maxField,
        workerFps
      };
    };
    postMessage(getCenterMassVector());
  };
})();
