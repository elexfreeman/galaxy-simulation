import * as C from './consts';
import {Vector} from './vector';

export class Body {

  constructor(coord, massa, color = '#000000') {
    this.coord = coord;
    this.massa = massa;
    this.velocity = new Vector(0, 0);
    this.color = color;
    this.family = 0;
  }

  setCoord2(coord) {
    const cold = 0.9;
    if (coord.x > C.MAX_X) {
      this.velocity.x = -this.velocity.x * cold;
    } else if (coord.x < 0) {
      this.velocity.x = -this.velocity.x * cold;
    }
    this.coord.x = coord.x;

    if (coord.y > C.MAX_Y) {
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

  static draw(ctx, body, centerMassVector) {
    console.log(body)
    ctx.beginPath();
    ctx.strokeStyle = body.color;
    ctx.moveTo(body.coord.x, body.coord.y);
    ctx.arc(body.coord.x - centerMassVector.x, body.coord.y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }
}
