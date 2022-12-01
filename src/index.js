import * as C from './consts';
import {Calculator} from './calculator';


const myWorker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module'
});

const ctx = document.getElementById('canvas').getContext('2d');

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  myWorker.postMessage('next');
}


myWorker.onmessage = (e) => {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, C.MAX_X, C.MAX_Y); // clear canvas
  ctx.restore();

  Calculator.draw(ctx,
    e.data.centerMassVector,
    e.data.data,
  );

  window.requestAnimationFrame(draw);
}

init();
