import Vue from 'vue';

import App from '@/ui/App.vue';
import * as C from '@/consts';

import { Vector } from '@/utils/vector';
import { GeneratorCircle } from '@/bodyGenerator';
import { getDotColorFromField } from '@/utils/gradient';
import { xyToCanvas } from './utils/common';

import { WorkerCore } from '@/worker/worker-core';

import { addSphereInit } from '@/module/addSphere';
import { mouseCoordInit } from '@/module/mouseCursor';
import { fpsMeter } from '@/module/fps';

import stars from '@/global/stars';
import { draw } from '@/global/draw';
import { core } from '@/global/core';
import { player } from '@/global/player';

import '@/styles/style.scss';

const workerCore = new WorkerCore((data) => {
  stars.centerMassVector = data.centerMassVector;
  stars.maxField = data.maxField;
});

const drawStars = () => {
  const starSize = new Vector(1, 1);

  for (let k = 0; k < stars.getCount(); k++) {
    const point = xyToCanvas(
      stars.getStarXY(k),
      stars.zoom,
      stars.centerMassVector,
      draw.getVH(),
    );
    const color = getDotColorFromField(stars.getField(k), stars.maxField);

    draw.rect(point, starSize, color);
  }
};

const calcStars = () => {
  stars.dataArr = core.kernel.setOutput([stars.dataArr.length]).setConstants({
    len: stars.getCount(),
  })(C.G, stars.dataArr);

  stars.dataArrWithField = core.kernelForce
    .setOutput([stars.getCount()])
    .setConstants({
      len: stars.getCount(),
    })(C.G, stars.dataArr);
};

/////////////////////
/////////////////////
/////////////////////
async function drawFrame() {
  fpsMeter.start();
  draw.clear();

  if (!stars.isPause) {
    workerCore.calc(stars.dataArrWithField);
    calcStars();
  }

  drawStars();
  player.tick();
  fpsMeter.finish();
  window.requestAnimationFrame(drawFrame);
}

const initDataArr = () => {
  const bodyGenerator = new GeneratorCircle();
  let bodyList = bodyGenerator.generate();

  for (let k = 0; k < bodyList.length; k++) {
    stars.addStar(bodyList[k].coord, bodyList[k].velocity);
  }
};

const main = () => {
  initDataArr();

  // init modules
  mouseCoordInit();
  addSphereInit();

  workerCore.init();

  draw.ctx.canvas.width = window.innerWidth;
  draw.ctx.canvas.height = window.innerHeight;
  window.addEventListener(
    'resize',
    () => {
      draw.ctx.canvas.width = window.innerWidth;
      draw.ctx.canvas.height = window.innerHeight;
    },
    true,
  );

  window.requestAnimationFrame(drawFrame);
};

main();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
