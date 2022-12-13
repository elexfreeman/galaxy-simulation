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
