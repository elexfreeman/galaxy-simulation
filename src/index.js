import Vue from 'vue';
import App from './ui/App.vue';

import {Vector} from './vector';
import {GeneratorCircle} from './bodyGenerator';
import {kernel} from './gpu-core2'
import * as C from './consts';

const workerMassCenter = new Worker(
  new URL('./workerMassCenter.js', import.meta.url),
  {type: 'module'}
);

const ctx = document.getElementById('canvas').getContext('2d');

let dataArr = [];

let centerMassVector = new Vector(0, 0);

const bodyGenerator = new GeneratorCircle();
let bodyList = bodyGenerator.generate();

const initData = () => {
  for (let k = 0; k < bodyList.length; k++) {
    dataArr.push([
      bodyList[k].coord.x,
      bodyList[k].coord.y,
      bodyList[k].velocity.y,
      bodyList[k].velocity.y,
    ]);
  }
}

function init() {
  initData();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}



async function draw() {
  ctx.globalCompositeOperation = 'destination-over';

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

  let start = new Date();
  dataArr = kernel(C.G, C.MAX_DOTS, dataArr);

  // calc time delay
  let time = new Date() - start;
  let x = 0;
  let y = 0;

  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#ffffff'
  ctx.font = '48px serif';
  ctx.fillText(time, 100, 100);

  for (let k = 0; k < C.MAX_DOTS; k++) {
    x = dataArr[k][0];
    y = dataArr[k][1];
    ctx.beginPath();
    ctx.strokeStyle = '#ffffff'
    ctx.arc(x - centerMassVector.x, y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }

  workerMassCenter.postMessage({
    dataArr,
    width: window.innerWidth,
    height: window.innerHeight,
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
