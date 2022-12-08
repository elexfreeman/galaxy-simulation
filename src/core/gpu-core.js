import * as C from '@/consts';


/**
 * data [x, y, vx, vy, massa ]
 *       0, 1,  2,  3
*/
export const kernelXY = function (GG, data) {
  const {len} = this.constants;
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
    if (k !== this.thread.x) {

      // find vector 
      xMinus = data[k][0] - data[this.thread.x][0];
      yMinus = data[k][1] - data[this.thread.x][1];

      //find Radius
      R = sqrt((xMinus * xMinus) + (yMinus * yMinus));
      R = R * R;

      // find force
      FX = GG * xMinus / (1 + R);
      FY = GG * yMinus / (1 + R);

      // F + V
      newVX = FX + newVX;
      newVY = FY + newVY;
    }
  }

  // coord++
  newX = newVX + data[this.thread.x][0];
  newY = newVY + data[this.thread.x][1];


  return [newX, newY, newVX, newVY];
}

export const kernelForceField = function (data) {
  const {len} = this.constants;

  // gravite field
  let xGField = 0;
  let yGField = 0;

  let xMinus = 0;
  let yMinus = 0;
  let GFieldLen = 0;

  for (let k = 0; k < len; k++) {
    if (k !== this.thread.x) {

      // find vector 
      xMinus = data[k][0] - data[this.thread.x][0];
      yMinus = data[k][1] - data[this.thread.x][1];

      xGField += xMinus;
      yGField += yMinus;

    }
  }
  xGField = xGField / len;
  yGField = yGField / len;

  GFieldLen = sqrt((xGField * xGField) + (yGField * yGField));

  return [data[this.thread.x][0], data[this.thread.x][1], GFieldLen];
}
