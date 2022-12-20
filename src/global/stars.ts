import { Vector } from '@/vector';

export const DATA_X = 0;
export const DATA_Y = 1;
export const DATA_VX = 2;
export const DATA_VY = 3;
export const DATA_FIELD = 2;

export type IStar = number[];

export class Stars {
  public zoom: number = 1.0;
  public maxField: number = 0;

  public dataArr: IStar[] = [];
  public dataArrWithField: IStar[] = [];
  public centerMassVector = new Vector(0, 0);

  public isPause: boolean = false;

  getCount(): number {
    return this.dataArr.length;
  }

  getStarXY(starIdx: number): Vector {
    return new Vector(
      this.dataArr[starIdx][DATA_X],
      this.dataArr[starIdx][DATA_Y],
    );
  }

  getStarV(starIdx: number): Vector {
    return new Vector(
      this.dataArr[starIdx][DATA_VX],
      this.dataArr[starIdx][DATA_VY],
    );
  }

  getField(starIdx: number) {
    return this.dataArrWithField[starIdx][DATA_FIELD];
  }
}

const stars = new Stars();

export default stars;
