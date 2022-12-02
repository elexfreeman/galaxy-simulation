import * as C from './consts';
import {Calculator} from './calculator';


const myWorker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module'
});

const ctx = document.getElementById('canvas').getContext('2d');

function init() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}

function draw() {
  myWorker.postMessage({
    width: window.innerWidth,
    height: window.innerHeight,
  });
}


myWorker.onmessage = (e) => {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
  ctx.restore();

  Calculator.draw(ctx,
    e.data.centerMassVector,
    e.data.data,
  );

  window.requestAnimationFrame(draw);
}

window.addEventListener('resize', function (event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}, true);
init();
