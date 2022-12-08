import {Vector} from './vector';

onmessage = function (e) {
  const {
    dataArr,
    width,
    height,
    count,
  } = e.data;


  const getCenterMassVector = () => {

    const centerMassVector = new Vector(0, 0);

    for (let k = 0; k < dataArr.length; k++) {
      centerMassVector.x += dataArr[k][0];
      centerMassVector.y += dataArr[k][1];
    }
    centerMassVector.x = (centerMassVector.x / count) - (width / 2);
    centerMassVector.y = (centerMassVector.y / count) - (height / 2);

    return centerMassVector;
  }

  postMessage(getCenterMassVector());
}

