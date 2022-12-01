import {ITERATION_COUNT} from './consts';
import {GeneratorCircle} from './bodyGenerator';
import {Calculator} from './calculator';

const bodyGenerator = new GeneratorCircle();
const calc = new Calculator(bodyGenerator);

onmessage = function (e) {
  calc.calc(ITERATION_COUNT);
  postMessage({
    centerMassVector: calc.centerMassVector,
    bodyList: calc.bodyList,
  });
}
