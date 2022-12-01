import {CalculatorWorker} from './calculatorWorker';


onmessage = function (e) {
  const {
    bodyList,
    startIdx,
    count,
    workerIdx
  } = e.data;

  const calc = new CalculatorWorker(bodyList, startIdx, count);
  const data = calc.calc();
  postMessage(data);
}
