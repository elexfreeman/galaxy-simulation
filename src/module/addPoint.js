import * as C from '@/consts';

export const addPointInit = () => {
  window.canvasElem.elem.addEventListener('click', (event) => {
    window.isPause = true;
    const x = window.canvasElem.x;
    const y = window.canvasElem.y;
    const newStar = [
      x + window.centerMassVector.x,
      y + window.centerMassVector.y,
      0,
      0,
    ];
    window.dataArr.push(newStar);
    window.MAX_DOTS++;
    setTimeout(() => {
      window.isPause = false;
    }, 1);
  });
}
