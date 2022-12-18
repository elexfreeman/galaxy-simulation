import Vue from 'vue';

import App from '@/ui/App.vue';
import * as C from '@/consts';

import {Vector} from '@/vector';
import {GeneratorCircle} from '@/bodyGenerator';
import {getDotColorFromField} from '@/utils/gradient'
import {Draw} from './utils/draw';
import {xyToCanvas} from './utils/utils';

import {Core} from '@/core/core';
import {WorkerCore} from '@/worker/worker-core'

import {addSphereInit} from '@/module/addSphere';
import {mouseCoordInit} from '@/module/mouseCursor';
import {FpsMeter} from '@/module/fps'
import {starTrackerInit, drawMouseRect} from '@/module/starTracker';

import stars from '@/stars';

import '@/styles/style.scss';

window.vec = Vector;

const ctx = document.getElementById('canvas').getContext('2d');
window.draw = new Draw(ctx, window.innerWidth, window.innerHeight);

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

const workerCore = new WorkerCore((data) => {
  window.centerMassVector = data.centerMassVector;
  window.maxField = data.maxField;
});

const drawStars = () => {
  for (let k = 0; k < window.dataArr.length; k++) {
    window.draw.rect(
      xyToCanvas(
        new Vector(window.dataArr[k][0], window.dataArr[k][1]),
        window.zoom,
        centerMassVector,
        window.draw.getVH()
      ),
      new Vector(1, 1),
      getDotColorFromField(window.dataArrWithField[k][2])
    );
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
  fpsMeter.start();
  window.draw.clear();

  if (!window.isPause) {
    workerCore.calc(window.dataArrWithField);
    calcStars();
  }

  drawStars();
  drawMouseRect();
  fpsMeter.finish();
  window.requestAnimationFrame(draw);
}

const initDataArr = () => {
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
}

const main = () => {
  initDataArr();

  // init modules
  starTrackerInit();
  mouseCoordInit();
  addSphereInit();

  workerCore.init();

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }, true);

  window.requestAnimationFrame(draw);
}

main();

new Vue({
  render: (h) => h(App),
}).$mount('#app');

