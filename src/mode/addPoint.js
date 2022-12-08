import * as C from '@/consts';

export const addPointInit = () => {
  window.canvasElem.elem.addEventListener('click', (event) => {
    window.isPause = true;
    setTimeout(() => {
      const x = window.canvasElem.x;
      const y = window.canvasElem.y;
      window.dataArr.push([
        x + window.centerMassVector.x,
        y + window.centerMassVector.y,
        0,
        0,
      ]);
      window.MAX_DOTS++;
      window.isPause = false;
    }, 1000);
  });
}
