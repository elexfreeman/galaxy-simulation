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
      return {
        centerMassVectorXY,
        maxField
      };
    };
    postMessage(getCenterMassVector());
  };
})();
