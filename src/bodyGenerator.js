import * as C from '@/consts';
import { Vector } from '@/vector';
import { Body } from '@/body';
import { getRandomInt } from '@/utils/common';

export class BodyGenerator {
  generate() {
    const bodyList = [];

    for (let k = 0; k < C.MAX_DOTS; k++) {
      bodyList.push(new Body(new Vector(getRandomInt(300, 600), getRandomInt(300, 600)), 5));
    }

    for (let k = 0; k < C.MAX_DOTS; k++) {
      bodyList.push(new Body(new Vector(getRandomInt(400, 800), getRandomInt(400, 800)), 5));
    }
    return bodyList;
  }
}

export class GeneratorCircle extends BodyGenerator {
  static getDot(center, radius, color) {
    const getX = (rad, grad) => {
      return rad * Math.sin(grad);
    };

    const getY = (rad, grad) => {
      return rad * Math.cos(grad);
    };

    const grad = (getRandomInt(0, 360) * 3.14) / 180;
    const rad = getRandomInt(1, radius);

    const body = new Body(new Vector(getX(rad, grad) + center.x, getY(rad, grad) + center.y), 5, color);

    return body;
  }

  generate() {
    const bodyList = [];

    const addDots = (count, vec, radius, color = '#ffffff') => {
      for (let k = 0; k < count; k++) {
        bodyList.push(GeneratorCircle.getDot(vec, radius, color));
      }
    };

    addDots(Math.ceil(C.MAX_DOTS), new Vector(600, 400), 500, '#f8a5a5');

    //    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(0, 1200), 200, '#f8a5a5');
    //    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(1200, 0), 200, '#faeb9e');
    //    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(1200, 1200), 200, '#d0ecc2');

    return bodyList;
  }
}
