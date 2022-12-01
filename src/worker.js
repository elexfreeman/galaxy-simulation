import {ITERATION_COUNT, THREAD_COUNT} from './consts';
import {GeneratorCircle} from './bodyGenerator';
import {CalculatorWorker} from './calculatorWorker';

const workerList = [];

const bodyGenerator = new GeneratorCircle();
let bodyList = bodyGenerator.generate();
console.log('len', bodyList.length)


const calcData = (workerIdx, bodyList, startIdx, count) => {
  return new Promise(resolve => {
    workerList[workerIdx].postMessage(
      {
        bodyList,
        startIdx,
        count,
        workerIdx,
      }
    );

    const listnerFnc = (event) => {
      resolve(event.data);
    };

    workerList[workerIdx].onmessage = listnerFnc;

  });
}

for (let k = 0; k < THREAD_COUNT; k++) {
  workerList.push(
    new Worker(new URL('./workerCalc.js', import.meta.url), {
      type: 'module'
    })
  );
}


onmessage = async function (e) {

  const count = Math.ceil(bodyList.length / THREAD_COUNT);

  for (let t = 0; t < ITERATION_COUNT; t++) {
    const promiseList = [];
    for (let k = 0; k < THREAD_COUNT; k++) {
      const startIdx = k * count;
      promiseList.push(calcData(k, bodyList, startIdx, count));
    }

    const data = await Promise.all(promiseList);
    bodyList = data.reduce((accumulator, currentValue) => {
      return [...accumulator, ...currentValue];
    }, []);
  }


  const calc = new CalculatorWorker(bodyList, 0, 1);
  const centerMassVector = calc.getCenterMassVector();
  postMessage({
    data: bodyList,
    centerMassVector,
  });

}
