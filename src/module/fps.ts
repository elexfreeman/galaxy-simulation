export class FpsMeter {
  startTime: Date;
  fps: number = 0;

  readonly ceil = 100;

  constructor() {
    this.startTime = new Date();
  }

  start() {
    this.startTime = new Date();
  }

  finish() {
    this.fps =
      Math.ceil(
        (this.ceil * 1000) / (new Date().valueOf() - this.startTime.valueOf()),
      ) / this.ceil;
  }
}

export const fpsMeter = new FpsMeter();
