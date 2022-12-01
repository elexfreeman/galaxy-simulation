import * as C from './consts';
import {Vector} from './vector';
import {Body} from './body';

export class Calculator {

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
    centerMassVector.x = (centerMassVector.x / this.bodyList.length) - (C.MAX_X / 2);
    centerMassVector.y = (centerMassVector.y / this.bodyList.length) - (C.MAX_Y / 2);

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

  static draw(ctx, centerMassVector, bodyList) {
    for (let k = 0; k < bodyList.length; k++) {
      Body.draw(ctx, bodyList[k], centerMassVector);
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
      body.setCoord3(Vector.add(body.velocity, body.coord));
    }

  }

  static getF(a, b) {
    const F = new Vector(0, 0);


    const getFamilyF = () => {
      if (a.family == b.family) return C.FAMILY_FORCE;
      return 1;
    }

    const vec = Vector.minus(b.coord, a.coord);
    const length = Vector.length(vec);


    F.x = C.G * getFamilyF() * vec.x / (length * length)
    F.y = C.G * getFamilyF() * vec.y / (length * length);


    return F;
  }

}
