const MAX_Y = 1000;
const MAX_X = 1000;
const MAX_DOTS = 500;

const MAX_DOT_X = 100000;
const MAX_DOT_Y = 100000;

const G = 0.0000001;

const FAMILY_FORCE = 9.0;

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

const notNULL = (a) => {
  if (a == 0) return 0.0000001;
  return a;
}

class Vector {
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
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
}

class Body {

  constructor(ctx, coord, massa, color = '#000000') {
    this.coord = coord;
    this.massa = massa;
    this.ctx = ctx;
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

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.coord.x, this.y);
    ctx.arc(this.coord.x, this.coord.y, 3, 0, Math.PI * 2, false); // Earth orbit
    ctx.closePath();
    ctx.stroke();
  }
}

class BodyGenerator {
  constructor(ctx) {
    this.ctx = ctx;
  }

  generate() {
    const bodyList = [];

    for (let k = 0; k < MAX_DOTS; k++) {
      bodyList.push(new Body(ctx,
        new Vector(
          getRandomInt(300, 600),
          getRandomInt(300, 600)
        ), 5))
    }

    for (let k = 0; k < MAX_DOTS; k++) {
      bodyList.push(new Body(ctx,
        new Vector(
          getRandomInt(400, 800),
          getRandomInt(400, 800)
        ), 5))
    }
    return bodyList;
  }
}

class GeneratorCircle extends BodyGenerator {
  generate() {
    const bodyList = [];
    let family = 0;

    const R = 100;
    const getX = (rad, grad) => {
      return rad * Math.sin(grad);
    }

    const getY = (rad, grad) => {
      return rad * Math.cos(grad);
    }

    const addDots = (vec, radius, color = '#ffffff') => {

      for (let k = 0; k < MAX_DOTS; k++) {
        const grad = getRandomInt(0, 360) * 3.14 / 180;
        const rad = getRandomInt(1, radius);

        if (k % 2) {
          family++;
        }

        const body = new Body(ctx,
          new Vector(
            getX(rad, grad) + vec.x,
            getY(rad, grad) + vec.y,
          ), 5, color);
        body.family = family;

        bodyList.push(body);
      }
    }

    addDots(new Vector(600, 400), 200, '#f8a5a5');
    addDots(new Vector(500, 500), 170, '#f8f4a5');
    addDots(new Vector(300, 500), 100, '#a5f8d4');

    return bodyList;

  }
}

class Calculator {

  constructor(bodyGenerator) {
    this.bodyList = bodyGenerator.generate();
  }

  draw() {
    for (let k = 0; k < this.bodyList.length; k++) {
      this.calcBody(this.bodyList[k], k);
      this.bodyList[k].draw();
    }
  }

  calcBody(body, currentN) {
    let color = 0;
    for (let k = 0; k < this.bodyList.length; k++) {
      if (k != currentN) {
        const otherBody = this.bodyList[k];
        const F = Calculator.getF(body, otherBody);
        body.velocity = Vector.add(body.velocity, F);

        //       const vec = Vector.minus(body.coord, otherBody.coord);
        //       color += Vector.length(vec);
      }
      //      body.color = '#' + Math.ceil(1000 * color / this.bodyList.length).toString(16);
    }

    for (let k = 0; k < this.bodyList.length; k++) {
      body.setCoord2(Vector.add(body.velocity, body.coord));
    }

  }

  static getF(a, b) {
    const F = new Vector(0, 0);


    const getFamilyF = () => {
      if (a.family == b.family) return FAMILY_FORCE;
      return 1;
    }

    const vec = Vector.minus(b.coord, a.coord);
    const length = Vector.length(vec);

    F.x = G * getFamilyF() * vec.x / length;
    F.y = G * getFamilyF() * vec.y / length;


    return F;
  }

}

const ctx = document.getElementById('canvas').getContext('2d');
const bodyGenerator = new GeneratorCircle(ctx);
const calc = new Calculator(bodyGenerator);

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, MAX_X, MAX_Y); // clear canvas

  ctx.restore();

  calc.draw();

  //  setInterval(() => {draw();}, 1000)

  window.requestAnimationFrame(draw);
}

init();
