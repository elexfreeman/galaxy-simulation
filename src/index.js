import {GPU} from 'gpu.js';
import {Vector} from './vector';
import {Body} from './body';
import {GeneratorCircle} from './bodyGenerator';
import {CalculatorWorker} from './calculatorWorker';
import * as C from './consts';


const ctx = document.getElementById('canvas').getContext('2d');

let dataX = [];
let dataY = [];
let dataVx = [];
let dataVy = [];

const bodyGenerator = new GeneratorCircle();
let bodyList = bodyGenerator.generate();

const initData = () => {
  for (let k = 0; k < bodyList.length; k++) {
    dataX.push(bodyList[k].coord.x);
    dataY.push(bodyList[k].coord.y);
    dataVx.push(bodyList[k].velocity.x);
    dataVy.push(bodyList[k].velocity.y);
  }
}

const gpu = new GPU();
const kernel = gpu.createKernel(function (GG, x, y, vx, vy, len) {
  let newX = 0;
  let newY = 0;
  let newVX = vx[this.thread.x];
  let newVY = vy[this.thread.x];
  //
  let FX = 0;
  let FY = 0;
  let R = 0
  let xMinus = 0;
  let yMinus = 0;

  for (let k = 0; k < len; k++) {
    if (k != this.thread.x) {

      // find F
      xMinus = x[k] - x[this.thread.x];
      yMinus = y[k] - y[this.thread.x];

      //find Radius
      R = sqrt((xMinus * xMinus) + (yMinus * yMinus));

      // finde force
      FX = GG * xMinus / (R * R);
      FY = GG * yMinus / (R * R);

      // F + V
      newVX = FX + newVX;
      newVY = FY + newVY;

    }
  }
  // coord++
  newX = newVX + x[this.thread.x];
  newY = newVY + y[this.thread.x];

  return [newX, newY, newVX, newVY];
}).setOutput([C.MAX_DOTS]);



function init() {
  initData();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.requestAnimationFrame(draw);
}

const body = new Body(new Vector(0, 0), 1);
const calc = new CalculatorWorker(bodyList, 0, 1);

const getCenterMassVector = () => {

  const centerMassVector = new Vector(0, 0);

  for (let k = 0; k < C.MAX_DOTS; k++) {
    centerMassVector.x += dataX[k];
    centerMassVector.y += dataY[k];
  }
  centerMassVector.x = (centerMassVector.x / C.MAX_DOTS) - (window.innerWidth / 2);
  centerMassVector.y = (centerMassVector.y / C.MAX_DOTS) - (window.innerHeight / 2);

  return centerMassVector;
}

function draw() {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
  ctx.restore();


  // const centerMassVector = calc.getCenterMassVector();
  const centerMassVector = getCenterMassVector();
  const outData = kernel(C.G, dataX, dataY, dataVx, dataVy, C.MAX_DOTS);

  dataX = [];
  dataY = [];
  dataVx = [];
  dataVy = [];

  for (let k = 0; k < C.MAX_DOTS; k++) {
    dataX.push(outData[k][0]);
    dataY.push(outData[k][1]);
    dataVx.push(outData[k][2]);
    dataVy.push(outData[k][3]);
  }

  //  console.log(dataX, dataY)

  for (let k = 0; k < dataX.length; k++) {
    const x = dataX[k];
    const y = dataY[k];
    ctx.beginPath();
    ctx.strokeStyle = '#ffffff'
    ctx.arc(x - centerMassVector.x, y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }

  window.requestAnimationFrame(draw);
}


//myWorker.onmessage = (e) => {
//  ctx.globalCompositeOperation = 'destination-over';
//  ctx.clearRect(0, 0, C.MAX_X, C.MAX_Y); // clear canvas
//  ctx.restore();
//
//
////  window.requestAnimationFrame(draw);
//}

window.addEventListener('resize', function (event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}, true);
init();
