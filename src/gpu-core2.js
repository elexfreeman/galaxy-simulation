import {GPU} from 'gpu.js';
import * as C from './consts';

const gpu = new GPU();

/**
 * data [x, y, vx, vy ]
 *       0, 1,  2,  3
*/
export const kernel = gpu.createKernel(function (GG, len, data) {
  let newX = 0;
  let newY = 0;
  let newVX = data[this.thread.x][2];
  let newVY = data[this.thread.x][3];
  //
  let FX = 0;
  let FY = 0;
  let R = 0
  let xMinus = 0;
  let yMinus = 0;

  for (let k = 0; k < len; k++) {
    if (k != this.thread.x) {

      // find F
      xMinus = data[k][0] - data[this.thread.x][0];
      yMinus = data[k][1] - data[this.thread.x][1];

      //find Radius
      R = sqrt((xMinus * xMinus) + (yMinus * yMinus));
      R = R * R;


      // finde force
      FX = GG * xMinus / R;
      FY = GG * yMinus / R;

      // F + V
      newVX = FX + newVX;
      newVY = FY + newVY;

    }
  }
  // coord++
  newX = newVX + data[this.thread.x][0];
  newY = newVY + data[this.thread.x][1];

  return [newX, newY, newVX, newVY];
}).setOutput([C.MAX_DOTS]);

