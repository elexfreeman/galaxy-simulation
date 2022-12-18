import {Vector} from "./vector";

export const DATA_X = 0;
export const DATA_Y = 1;
export const DATA_VX = 2;
export const DATA_VY = 3;

export class Stars {
  public zoom: number = 1.0;

  public dataArr: number[] = [];
  public dataArrWithField: number[] = [];
  public centerMassVector = new Vector(0,0);

  public isPause: boolean = false;

  getCount(): number {
    return this.dataArr.length;
  }

}

const stars = new Stars();
export default stars;
