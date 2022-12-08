import Vue from 'vue';
import App from './ui/App.vue';
import * as C from './consts';

import {generateColor} from '@/utils/gradient'
import {Vector} from './vector';
import {GeneratorCircle} from './bodyGenerator';
import {kernel, kernelForceField} from '@/core/gpu-core'

import '@/styles/style.scss';

window.dataArr = [];

const workerMassCenter = new Worker(
  new URL('./workerMassCenter.js', import.meta.url),
  {type: 'module'}
);

const ctx = document.getElementById('canvas').getContext('2d');

const gradientColorList = generateColor('#0ecf9e', '#f58484', 1000);

let centerMassVector = new Vector(0, 0);

const initData = () => {
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
  C.MAX_DOTS.count = window.dataArr.length;
  console.log(C)
}

function init() {
  initData();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}

const getDotColorFromField = (field) => {
  let k = Math.ceil(field);
  if (field > 1000) k = 1000;
  return `#${gradientColorList[k]}`;
}


async function draw() {
  ctx.globalCompositeOperation = 'destination-over';

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

  let start = new Date();
  window.dataArr = kernel(C.G, window.dataArr);
  const dataArrWithField = kernelForceField(window.dataArr);

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
    ctx.strokeStyle = getDotColorFromField(field);
    ctx.arc(x - centerMassVector.x, y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }


  workerMassCenter.postMessage({
    dataArr: window.dataArr,
    width: window.innerWidth,
    height: window.innerHeight,
    count: C.MAX_DOTS.count,
  });
}


workerMassCenter.onmessage = (e) => {
  centerMassVector = e.data;
  window.requestAnimationFrame(draw);
};


window.addEventListener('resize', function (event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}, true);

init();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
