import Vue from 'vue';

import App from '@/ui/App.vue';
import * as C from '@/consts';

import {generateColor} from '@/utils/gradient'
import {Vector} from '@/vector';
import {GeneratorCircle} from '@/bodyGenerator';
import {Core} from '@/core/core';

import {addPointInit} from '@/module/addPoint';
import {addSphereInit} from '@/module/addSphere';
import {mouseCoordInit} from '@/module/mouseCursor';

import '@/styles/style.scss';

const ctx = document.getElementById('canvas').getContext('2d');

const gradientColorList = generateColor('#f58484', '#0ecf9e', 10000);

window.core = new Core();


window.dataArr = [];
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

window.MAX_DOTS = C.MAX_DOTS.count;

const workerMassCenter = new Worker(
  new URL('./workerMassCenter.js', import.meta.url),
  {type: 'module'}
);

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

  //addPointInit();
  mouseCoordInit();
  addSphereInit();

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

/////////////////////
/////////////////////
/////////////////////

async function draw() {
  if (window.isPause) {
    window.requestAnimationFrame(draw);
    return;
  }

  let start = new Date();

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas

  window.dataArr = window.core.kernel
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length
    })(C.G, window.dataArr);

  const dataArrWithField = window.core.kernelForce
    .setOutput([window.dataArr.length])
    .setConstants({
      len: window.dataArr.length,
    })(C.G, window.dataArr);



  let x = 0;
  let y = 0;
  let dx, dy = 0;
  let field = 0;

  for (let k = 0; k < dataArrWithField.length; k++) {
    x = dataArrWithField[k][0];
    y = dataArrWithField[k][1];
    field = dataArrWithField[k][2];

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

  // calc time delay
  let time = Math.ceil(100* 1000 / (new Date() - start))/100;
  window.fps = time;


  workerMassCenter.postMessage({
    dataArr: dataArrWithField,
    width: window.innerWidth,
    height: window.innerHeight,
    count: window.MAX_DOTS,
  });
}

workerMassCenter.onmessage = (e) => {
  window.centerMassVector = e.data.centerMassVectorXY
  window.centerMassVectorV = e.data.centerMassVectorV;
  window.maxField = e.data.maxField;
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

