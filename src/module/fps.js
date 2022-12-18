export class FpsMeter {
  constructor() {
    this.startTime = new Date();
  }

  start() {
    this.startTime = new Date();
  }

  finish() {
    window.fps = Math.ceil((100 * 1000) / (new Date() - this.startTime)) / 100;
  }
}
