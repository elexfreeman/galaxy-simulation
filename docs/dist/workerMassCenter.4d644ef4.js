(function() {
  "use strict";
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
    static length(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
    }
  }
  onmessage = function(e) {
    const {
      dataArr
    } = e.data;
    const getCenterMassVector = () => {
      const count = dataArr.length;
      const centerMassVectorXY = new Vector(0, 0);
      const centerMassVectorV = new Vector(0, 0);
      for (let k = 0; k < dataArr.length; k++) {
        centerMassVectorXY.x += dataArr[k][0];
        centerMassVectorXY.y += dataArr[k][1];
        centerMassVectorV.x += dataArr[k][2];
        centerMassVectorV.y += dataArr[k][3];
      }
      centerMassVectorXY.x = centerMassVectorXY.x / count;
      centerMassVectorXY.y = centerMassVectorXY.y / count;
      centerMassVectorV.x = centerMassVectorV.x / count;
      centerMassVectorV.y = centerMassVectorV.y / count;
      return {
        centerMassVectorXY,
        centerMassVectorV
      };
    };
    postMessage(getCenterMassVector());
  };
})();
