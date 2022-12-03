import {GPU} from 'gpu.js';
import * as C from './consts';

const gpu = new GPU();
export const kernel = gpu.createKernel(function (GG, x, y, vx, vy, len) {
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
