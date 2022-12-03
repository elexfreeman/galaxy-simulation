(function() {
  "use strict";
  const MAX_DOTS = 1e4;
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
      dataArr,
      width,
      height
    } = e.data;
    const getCenterMassVector = () => {
      const centerMassVector = new Vector(0, 0);
      for (let k = 0; k < MAX_DOTS; k++) {
        centerMassVector.x += dataArr[k][0];
        centerMassVector.y += dataArr[k][1];
      }
      centerMassVector.x = centerMassVector.x / MAX_DOTS - width / 2;
      centerMassVector.y = centerMassVector.y / MAX_DOTS - height / 2;
      return centerMassVector;
    };
    postMessage(getCenterMassVector());
  };
})();
