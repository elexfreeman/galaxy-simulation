import * as C from './consts';
import {Vector} from './vector';

onmessage = function (e) {
  const {
    dataArr,
    width,
    height,
  } = e.data;


  const getCenterMassVector = () => {

    const centerMassVector = new Vector(0, 0);

    for (let k = 0; k < C.MAX_DOTS; k++) {
      centerMassVector.x += dataArr[k][0];
      centerMassVector.y += dataArr[k][1];
    }
    centerMassVector.x = (centerMassVector.x / C.MAX_DOTS) - (width / 2);
    centerMassVector.y = (centerMassVector.y / C.MAX_DOTS) - (height / 2);

    return centerMassVector;
  }

  postMessage(getCenterMassVector());
}

