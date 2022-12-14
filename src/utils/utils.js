export const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const canvasToXy = () => {

}

export const xyToCanvas = (x, y, zoom, centerMassVector, w, h) => {
  let dx = (x - centerMassVector.x) * zoom;
  let dy = (y - centerMassVector.y) * zoom;

  dx = dx + w / 2;
  dy = dy + h / 2;

  return {
    dx, dy
  }
}
