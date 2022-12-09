import {Vector} from '@/vector';
import {GeneratorCircle} from '@/bodyGenerator';

export const addSphereInit = () => {
  window.addSphereCount = 500;
  window.addSphereRadius = 100;

  window.canvasElem.elem.addEventListener('click', (event) => {

    if (window.menuState !== 1) {return;}

    window.isPause = true;
    let x = window.canvasElem.x;
    let y = window.canvasElem.y;

    x -= window.innerWidth / 2;
    y -= window.innerHeight / 2;

    x = x / window.zoom;
    y = y / window.zoom;

    x += window.centerMassVector.x;
    y += window.centerMassVector.y;

    const center = new Vector(x, y);

    for (let k = 0; k < window.addSphereCount; k++) {
      const newStar = GeneratorCircle.getDot(center, addSphereRadius, '#FFFFFF');
      window.dataArr.push([
        newStar.coord.x,
        newStar.coord.y,
        0, 0,
      ]);
      window.MAX_DOTS++;
    }

    window.core.refresh();

    setTimeout(() => {
      window.isPause = false;
    }, 1);
  });
}
