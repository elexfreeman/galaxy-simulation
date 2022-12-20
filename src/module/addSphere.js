import { Vector } from '@/vector';
import { GeneratorCircle } from '@/bodyGenerator';
import stars from '@/global/stars';
import { draw, elem, mouseCoord } from '@/global/draw';
import { core } from '@/global/core';
import menuState from '@/module/menuState';

export const addSphereCount = 500;
export const addSphereRadius = 100;

export const addSphereInit = () => {
  elem.addEventListener('click', (event) => {
    if (menuState !== 1) {
      return;
    }

    // center = ( (mouseCoord -  VH * 0.5) / zoom ) + centerMassVector

    const center = Vector.add(
      Vector.multDigit(
        Vector.minus(
          Vector.fromVector(mouseCoord),
          Vector.multDigit(draw.geVH(), 0.5),
        ),
        1 / stars.zoom,
      ),
      stars.centerMassVector,
    );

    stars.isPause = true;

    for (let k = 0; k < addSphereCount; k++) {
      const newStar = GeneratorCircle.getDot(
        center,
        addSphereRadius,
        '#FFFFFF',
      );
      stars.dataArr.push([newStar.coord.x, newStar.coord.y, 0, 0]);
    }

    core.refresh();

    setTimeout(() => {
      stars.isPause = false;
    }, 1);
  });
};
