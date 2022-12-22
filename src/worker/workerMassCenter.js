import { Vector } from '../vector';
import { DATA_X, DATA_Y, DATA_FIELD } from '@/global/stars';

onmessage = function (e) {
  const { dataArr } = e.data;

  const getCenterMassVector = () => {
    let startWorker = new Date();
    const count = dataArr.length;
    let centerMassVectorXY = new Vector(0, 0);
    let maxField = 0;

    for (let k = 0; k < dataArr.length; k++) {
      centerMassVectorXY = Vector.add(
        centerMassVectorXY,
        new Vector(dataArr[k][DATA_X], dataArr[k][DATA_Y]),
      );
      if (dataArr[k][DATA_FIELD] > maxField) {
        maxField = dataArr[k][DATA_FIELD];
      }
    }
    centerMassVectorXY = Vector.multDigit(centerMassVectorXY, 1 / count);
    const workerFps = new Date() - startWorker;

    return {
      centerMassVectorXY,
      maxField,
      workerFps,
    };
  };

  postMessage(getCenterMassVector());
};
