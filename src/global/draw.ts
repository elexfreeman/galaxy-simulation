import { Draw } from '@/utils/draw';
import { Vector } from '@/utils/vector';

export const elem: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
export const ctx = elem.getContext('2d');
export const draw = new Draw(ctx);

export const mouseCoord = new Vector(0, 0);
export const mouseRect = new Vector(0, 0);
