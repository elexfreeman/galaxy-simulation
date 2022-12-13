import Vue from 'vue';

import App from '@/ui/App.vue';
import * as C from '@/consts';

import {generateColor} from '@/utils/gradient'
import {Vector} from '@/vector';
import {GeneratorCircle} from '@/bodyGenerator';

import {Core} from '@/core/core';
import {WorkerCore} from '@/worker/worker-core'

import {addSphereInit} from '@/module/addSphere';
import {mouseCoordInit} from '@/module/mouseCursor';
import {FpsMeter} from '@/module/fps'

import '@/styles/style.scss';


const workerCore = new WorkerCore();

const ctx = document.getElementById('canvas').getContext('2d');

const gradientColorList = generateColor('#f58484', '#0ecf9e', 10000);

window.core = new Core();

const fpsMeter = new FpsMeter();

window.dataArr = [];
window.dataArrWithField = [];
window.centerMassVector = new Vector(0, 0);
window.centerMassVectorV = new Vector(0, 0);

window.isPause = false;
window.zoom = 1.0;

window.canvasElem = {
  elem: document.getElementById('canvas'),
  x: 0,
  y: 0,
  ctx: ctx,
}

window.MAX_DOTS = C.MAX_DOTS;

const main = () => {
  const bodyGenerator = new GeneratorCircle();
  let bodyList = bodyGenerator.generate();

  for (let k = 0; k < bodyList.length; k++) {
    window.dataArr.push([
      bodyList[k].coord.x,
      bodyList[k].coord.y,
      bodyList[k].velocity.y,
      bodyList[k].velocity.y,
    ]);
  }
  window.MAX_DOTS = window.dataArr.length;

  //addPointInit();
  mouseCoordInit();
  addSphereInit();

  workerCore.init();

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}

const getDotColorFromField = (field) => {
  const maxColor = gradientColorList.length;
  let k = Math.ceil(maxColor * field / window.maxField);
  if (field > maxColor) k = maxColor;
  return `#${gradientColorList[k]}`;
}

const clearCanvas = () => {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
}

const drawStars = () => {
  let x = 0;
  let y = 0;
  let dx, dy = 0;
  let field = 0;

  for (let k = 0; k < window.dataArrWithField.length; k++) {
    x = window.dataArrWithField[k][0];
    y = window.dataArrWithField[k][1];
    field = window.dataArrWithField[k][2];

    dx = (x - window.centerMassVector.x) * window.zoom;
    dy = (y - window.centerMassVector.y) * window.zoom;

    dx = dx + window.innerWidth / 2;
    dy = dy + window.innerHeight / 2;

    ctx.beginPath();
    ctx.fillStyle = getDotColorFromField(field);
    ctx.fillRect(
      dx, dy,
      1, 1,
    )
    ctx.closePath();
    ctx.stroke();
  }
}

const calcStars = () => {
  window.dataArr = window.core.kernel
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length
    })(C.G, window.dataArr);

  window.dataArrWithField = window.core.kernelForce
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length,
    })(C.G, window.dataArr);
}

/////////////////////
/////////////////////
/////////////////////
async function draw() {
  clearCanvas();
  if (window.isPause) {
    drawStars();
    window.requestAnimationFrame(draw);
    return;
  }

  fpsMeter.start();

  workerCore.calc();
  calcStars();
  drawStars();

  fpsMeter.finish();

  window.requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}, true);

main();

new Vue({
  render: (h) => h(App),
}).$mount('#app');

