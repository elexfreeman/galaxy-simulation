import Vue from 'vue';
import {GPU} from 'gpu.js';

import App from '@/ui/App.vue';
import * as C from '@/consts';

import {generateColor} from '@/utils/gradient'
import {Vector} from '@/vector';
import {GeneratorCircle} from '@/bodyGenerator';
import {kernelXY, kernelForceField} from '@/core/gpu-core'

import {addPointInit} from '@/module/addPoint';
import {mouseCoordInit} from '@/module/mouseCursor';


import '@/styles/style.scss';

const ctx = document.getElementById('canvas').getContext('2d');
const gpu = new GPU();

window.dataArr = [];
window.isPause = false;
window.canvasElem = {
  elem: document.getElementById('canvas'),
  x: 0,
  y: 0,
  ctx: ctx,
}
window.MAX_DOTS = C.MAX_DOTS.count;
window.centerMassVectorV = new Vector(0, 0);

const workerMassCenter = new Worker(
  new URL('./workerMassCenter.js', import.meta.url),
  {type: 'module'}
);


const gradientColorList = generateColor('#0ecf9e', '#f58484', 1000);

window.centerMassVector = new Vector(0, 0);

const paintMouseCross = () => {

  ctx.fillRect(25, 25, 100, 100);
}

const INIT = () => {
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

  addPointInit();
  mouseCoordInit();

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}

const getDotColorFromField = (field) => {
  let k = Math.ceil(field);
  if (field > 1000) k = 1000;
  return `#${gradientColorList[k]}`;
}

const kernel = gpu.createKernel(kernelXY)
  .setDynamicArguments(true)
  .setDynamicOutput(true);
const kernelForce = gpu.createKernel(kernelForceField)
  .setDynamicArguments(true)
  .setDynamicOutput(true);

async function draw() {

  if (window.isPause) {
    window.requestAnimationFrame(draw);
    return;
  }

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

  let start = new Date();
  window.dataArr = kernel
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length
    })(C.G, window.dataArr);

  const dataArrWithField = kernelForce
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length,
    })(window.dataArr);

  // calc time delay
  let time = new Date() - start;

  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#ffffff'
  ctx.font = '48px serif';
  ctx.fillText(time, 100, 100);

  let x = 0;
  let y = 0;
  let field = 0;

  for (let k = 0; k < dataArrWithField.length; k++) {
    x = dataArrWithField[k][0];
    y = dataArrWithField[k][1];
    field = dataArrWithField[k][2];
    ctx.beginPath();
    ctx.fillStyle = getDotColorFromField(field);
    ctx.fillRect(
      x - window.centerMassVector.x,
      y - window.centerMassVector.y,
      1,
      1,
    )
    ctx.closePath();
    ctx.stroke();
  }

  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#ffffff'
  ctx.font = '48px serif';
  const textCenterV =
    `${Math.ceil(window.centerMassVectorV.x*1000)/ 1000}, ${Math.ceil(window.centerMassVectorV.y*1000)/1000}`;
  ctx.fillText(textCenterV, 100, 200);

  workerMassCenter.postMessage({
    dataArr: window.dataArr,
    width: window.innerWidth,
    height: window.innerHeight,
    count: window.MAX_DOTS,
  });
}


workerMassCenter.onmessage = (e) => {
  window.centerMassVector = e.data.centerMassVectorXY
  window.centerMassVectorV = e.data.centerMassVectorV;
  window.requestAnimationFrame(draw);
};


window.addEventListener('resize', function (event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}, true);

INIT();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
