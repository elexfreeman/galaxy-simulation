export const addPointInit = () => {
  window.canvasElem.elem.addEventListener('click', (event) => {
    window.isPause = true;
    let x = window.canvasElem.x;
    let y = window.canvasElem.y;

    x -= window.innerWidth / 2;
    y -= window.innerHeight / 2;

    x = x / window.zoom;
    y = y / window.zoom;

    x += window.centerMassVector.x;
    y += window.centerMassVector.y;




    const newStar = [
      x, y,
      0, 0,
    ];
    window.dataArr.push(newStar);
    window.MAX_DOTS++;
    setTimeout(() => {
      window.isPause = false;
    }, 1);
  });
}
