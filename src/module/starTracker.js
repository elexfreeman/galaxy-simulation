export class StarTrackerState {
  static default = 0;
  static startSelect = 1;
}

export const starTrackerInit = () => {
  window.starTrackerState = StarTrackerState.default;
  window.mouseRect = {
    x1: 0, y1: 0,
    x2: 0, y2: 0,
  }
}

export const drawMouseRect = () => {
  const {x1, x2, y1, y2} = window.mouseRect;
  if (x1 == x2 == y1 == y2) return;

  const ctx = window.canvasElem.ctx;
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.fillRect(
    x2, y2,
    x1 - x2 - 20, y1 - y2 - 20
  )
  ctx.closePath();
  ctx.stroke();
}

export const getStartsFromRect = () => {
  const {x1, x2, y1, y2} = window.mouseRect;
  const starList = [];

  const minX = x1 <= x2 ? x1 : x2;
  const minY = y1 <= y2 ? y1 : y2;

  const maxX = x1 > x2 ? x1 : x2;
  const maxY = y1 > y2 ? y1 : y2;

  for (let k = 0; k < window.dataArr.length; k++) {
    let x = window.dataArr[k][0];
    let y = window.dataArr[k][1];

    x = (x - window.centerMassVector.x) * window.zoom;
    y = (y - window.centerMassVector.y) * window.zoom;

    x = x + window.innerWidth / 2;
    y = y + window.innerHeight / 2;

    const isInRect = x > minX && x < maxX && y > minY && y < maxY;

    if(isInRect) starList.push(k);

  }

  return starList;
}

export class StarTracker {
  constructor(starList) {
    this.starList = starList;

  }
}
