const MAX_Y = 1e3;
const MAX_X = 1e3;
const G = 0.01;
const FAMILY_FORCE = 1;
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
class Body {
  constructor(coord, massa, color = "#000000") {
    this.coord = coord;
    this.massa = massa;
    this.velocity = new Vector(0, 0);
    this.color = color;
    this.family = 0;
  }
  setCoord2(coord) {
    const cold = 0.9;
    if (coord.x > MAX_X) {
      this.velocity.x = -this.velocity.x * cold;
    } else if (coord.x < 0) {
      this.velocity.x = -this.velocity.x * cold;
    }
    this.coord.x = coord.x;
    if (coord.y > MAX_Y) {
      this.velocity.y = -this.velocity.y * cold;
    } else if (coord.y < 0) {
      this.velocity.y = -this.velocity.y * cold;
    }
    this.coord.y = coord.y;
  }
  setCoord(coord) {
    if (coord.x > MAX_DOT_X) {
      this.coord.x = coord.x - MAX_DOT_X;
    } else if (coord.x < 0) {
      this.coord.x = MAX_DOT_X - coord.x;
    } else {
      this.coord.x = coord.x;
    }
    if (coord.y > MAX_DOT_Y) {
      this.coord.y = coord.y - MAX_DOT_Y;
    } else if (coord.y < 0) {
      this.coord.y = MAX_DOT_Y - coord.y;
    } else {
      this.coord.y = coord.y;
    }
  }
  setCoord3(coord) {
    this.coord.x = coord.x;
    this.coord.y = coord.y;
  }
  static draw(ctx2, body, centerMassVector) {
    ctx2.beginPath();
    ctx2.strokeStyle = body.color;
    ctx2.moveTo(body.coord.x, this.y);
    ctx2.arc(body.coord.x - centerMassVector.x, body.coord.y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx2.closePath();
    ctx2.stroke();
  }
}
class Calculator {
  constructor(bodyGenerator) {
    this.bodyList = bodyGenerator.generate();
    this.centerMassVector = new Vector(0, 0);
  }
  getCenterMassVector() {
    const centerMassVector = new Vector(0, 0);
    for (let k = 0; k < this.bodyList.length; k++) {
      centerMassVector.x += this.bodyList[k].coord.x;
      centerMassVector.y += this.bodyList[k].coord.y;
    }
    centerMassVector.x = centerMassVector.x / this.bodyList.length - MAX_X / 2;
    centerMassVector.y = centerMassVector.y / this.bodyList.length - MAX_Y / 2;
    return centerMassVector;
  }
  calc(nInteration) {
    for (let n = 0; n < nInteration; n++) {
      for (let k = 0; k < this.bodyList.length; k++) {
        this.calcBody(this.bodyList[k], k);
      }
    }
    this.centerMassVector = this.getCenterMassVector();
  }
  static draw(ctx2, centerMassVector, bodyList) {
    for (let k = 0; k < bodyList.length; k++) {
      Body.draw(ctx2, bodyList[k], centerMassVector);
    }
  }
  calcBody(body, currentN) {
    for (let k = 0; k < this.bodyList.length; k++) {
      if (k != currentN) {
        const otherBody = this.bodyList[k];
        const F = Calculator.getF(body, otherBody);
        body.velocity = Vector.add(body.velocity, F);
      }
    }
    for (let k = 0; k < this.bodyList.length; k++) {
      body.setCoord3(Vector.add(body.velocity, body.coord));
    }
  }
  static getF(a, b) {
    const F = new Vector(0, 0);
    const getFamilyF = () => {
      if (a.family == b.family)
        return FAMILY_FORCE;
      return 1;
    };
    const vec = Vector.minus(b.coord, a.coord);
    const length = Vector.length(vec);
    F.x = G * getFamilyF() * vec.x / (length * length);
    F.y = G * getFamilyF() * vec.y / (length * length);
    return F;
  }
}
const myWorker = new Worker("/assets/worker.bc0e273c.js", {
  type: "module"
});
const ctx = document.getElementById("canvas").getContext("2d");
function init() {
  window.requestAnimationFrame(draw);
}
function draw() {
  myWorker.postMessage("next");
}
myWorker.onmessage = (e) => {
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, MAX_X, MAX_Y);
  ctx.restore();
  Calculator.draw(ctx, e.data.centerMassVector, e.data.data);
  window.requestAnimationFrame(draw);
};
init();
