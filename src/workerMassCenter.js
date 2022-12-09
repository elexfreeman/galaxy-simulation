import {Vector} from './vector';

onmessage = function (e) {
  const {
    dataArr,
  } = e.data;


  const getCenterMassVector = () => {
    const count = dataArr.length;
    const centerMassVectorXY = new Vector(0, 0);
    let maxField = 0;

    for (let k = 0; k < dataArr.length; k++) {
      centerMassVectorXY.x += dataArr[k][0];
      centerMassVectorXY.y += dataArr[k][1];
      if (dataArr[k][2] > maxField) {
        maxField = dataArr[k][2];
      }
    }

    centerMassVectorXY.x = (centerMassVectorXY.x / count);
    centerMassVectorXY.y = (centerMassVectorXY.y / count);


    return {
      centerMassVectorXY,
      maxField,
    }
  }

  postMessage(getCenterMassVector());
}

