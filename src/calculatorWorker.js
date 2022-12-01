import * as C from './consts';
import {Vector} from './vector';
import {getF} from './force';

export class CalculatorWorker {

  constructor(bodyList, startIdx, count) {
    this.bodyList = bodyList;
    this.startIdx = startIdx;
    this.count = count;
  }

  getCenterMassVector() {
    const centerMassVector = new Vector(0, 0);

    for (let k = 0; k < this.bodyList.length; k++) {
      centerMassVector.x += this.bodyList[k].coord.x;
      centerMassVector.y += this.bodyList[k].coord.y;
    }
    centerMassVector.x = (centerMassVector.x / this.bodyList.length) - (C.MAX_X / 2);
    centerMassVector.y = (centerMassVector.y / this.bodyList.length) - (C.MAX_Y / 2);

    return centerMassVector;
  }

  calc() {
    const out = [];
    for (let k = this.startIdx; k < this.startIdx + this.count; k++) {
      if (k >= this.bodyList.length) break;
      this.calcBody(this.bodyList[k], k);
      out.push(this.bodyList[k]);
    }
    return out;
  }

  calcBody(body, currentN) {
    for (let k = 0; k < this.bodyList.length; k++) {
      if (k != currentN) {
        const otherBody = this.bodyList[k];
        const F = getF(body, otherBody);
        body.velocity = Vector.add(body.velocity, F);
      }
    }

    for (let k = 0; k < this.bodyList.length; k++) {
      const coord = Vector.add(body.velocity, body.coord);
      body.coord.x = coord.x;
      body.coord.y = coord.y;
    }

  }

}
