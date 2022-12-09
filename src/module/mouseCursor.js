export const mouseCoordInit = () => {
  window.canvasElem.elem.onmousemove = (event) => {
    window.canvasElem.x = event.x;
    window.canvasElem.y = event.y;
  }
}
