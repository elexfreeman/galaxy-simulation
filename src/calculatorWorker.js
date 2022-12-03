import {Vector} from './vector';
import {getF} from './force';

export class CalculatorWorker {

  constructor(data) {
    const {bodyList, startIdx, count, width, height} = data
    this.bodyList = bodyList;
    this.startIdx = startIdx;
    this.count = count;
    this.width = width;
    this.height = height;
  }

  getCenterMassVector() {
    const centerMassVector = new Vector(0, 0);

    for (let k = 0; k < this.bodyList.length; k++) {
      centerMassVector.x += this.bodyList[k].coord.x;
      centerMassVector.y += this.bodyList[k].coord.y;
    }
    centerMassVector.x = (centerMassVector.x / this.bodyList.length) - (this.width / 2);
    centerMassVector.y = (centerMassVector.y / this.bodyList.length) - (this.height / 2);

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

    const coord = Vector.add(body.velocity, body.coord);
    body.coord.x = coord.x;
    body.coord.y = coord.y;


  }

}
