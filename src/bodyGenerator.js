import * as C from './consts';
import {Vector} from './vector';
import {Body} from './body';
import {getRandomInt} from './utils';

export class BodyGenerator {

  generate() {
    const bodyList = [];

    for (let k = 0; k < C.MAX_DOTS; k++) {
      bodyList.push(new Body(new Vector(
        getRandomInt(300, 600),
        getRandomInt(300, 600)
      ), 5))
    }

    for (let k = 0; k < C.MAX_DOTS; k++) {
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

    addDots(Math.ceil(C.MAX_DOTS / 3), new Vector(600, 400), 200, '#f8a5a5');
    addDots(Math.ceil(C.MAX_DOTS / 3), new Vector(900, 400), 200, '#f84585');
    addDots(Math.ceil(C.MAX_DOTS / 3), new Vector(800, 900), 200, '#e81505');

    return bodyList;

  }
}
