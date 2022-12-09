import {Vector} from './vector';

onmessage = function (e) {
  const {
    dataArr,
    width,
    height,
    count,
  } = e.data;


  const getCenterMassVector = () => {

    const centerMassVectorXY = new Vector(0, 0);
    const centerMassVectorV = new Vector(0, 0);


    for (let k = 0; k < dataArr.length; k++) {
      centerMassVectorXY.x += dataArr[k][0];
      centerMassVectorXY.y += dataArr[k][1];
      centerMassVectorV.x += dataArr[k][2];
      centerMassVectorV.y += dataArr[k][3];
    }

    centerMassVectorXY.x = (centerMassVectorXY.x / count) - (width / 2);
    centerMassVectorXY.y = (centerMassVectorXY.y / count) - (height / 2);

    centerMassVectorV.x = (centerMassVectorV.x / count);
    centerMassVectorV.y = (centerMassVectorV.y / count);

    return {
      centerMassVectorXY,
      centerMassVectorV,
    }
  }

  postMessage(getCenterMassVector());
}

