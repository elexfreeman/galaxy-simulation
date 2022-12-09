import * as C from './consts';
import {Vector} from './vector';
import {Body} from './body';
import {getRandomInt} from './utils';

export class BodyGenerator {

  generate() {
    const bodyList = [];

    for (let k = 0; k < C.MAX_DOTS.count; k++) {
      bodyList.push(new Body(new Vector(
        getRandomInt(300, 600),
        getRandomInt(300, 600)
      ), 5))
    }

    for (let k = 0; k < C.MAX_DOTS.count; k++) {
      bodyList.push(new Body(new Vector(
        getRandomInt(400, 800),
        getRandomInt(400, 800)
      ), 5))
    }
    return bodyList;
  }
}

export class GeneratorCircle extends BodyGenerator {
  generate() {
    const bodyList = [];
    let family = 0;

    const getX = (rad, grad) => {
      return rad * Math.sin(grad);
    }

    const getY = (rad, grad) => {
      return rad * Math.cos(grad);
    }

    const addDots = (count, vec, radius, color = '#ffffff') => {

      for (let k = 0; k < count; k++) {
        const grad = getRandomInt(0, 360) * 3.14 / 180;
        const rad = getRandomInt(1, radius);

        if (k % 2) {
          family++;
        }

        const body = new Body(new Vector(
          getX(rad, grad) + vec.x,
          getY(rad, grad) + vec.y,
        ), 5, color);
        body.family = family;

        bodyList.push(body);
      }
    }

///    addDots(Math.ceil(C.MAX_DOTS.count), new Vector(600, 400), 500, '#f8a5a5');

    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(0, 1200), 200, '#f8a5a5');
    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(1200, 0), 200, '#faeb9e');
    addDots(Math.ceil(C.MAX_DOTS.count / 3), new Vector(1200, 1200), 200, '#d0ecc2');

    return bodyList;

  }
}
