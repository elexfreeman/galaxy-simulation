import {CalculatorWorker} from './calculatorWorker';


onmessage = function (e) {
  const calc = new CalculatorWorker(e.data);
  const data = calc.calc();
  postMessage(data);
}
