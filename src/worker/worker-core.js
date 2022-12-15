export class WorkerCore {
  constructor(callback) {
    this.callback = callback;
    this.workerMassCenter = new Worker(
      new URL('./workerMassCenter.js', import.meta.url),
      {type: 'module'}
    );
    this.workerHandeler = this.workerHandeler.bind(this);
    this.calc = this.calc.bind(this);
  }

  workerHandeler(e) {
    this.callback({
      centerMassVector: e.data.centerMassVectorXY,
      centerMassVectorV: e.data.centerMassVectorV,
      maxField: e.data.maxField,
    });
    this.isInProgress = false;

  }

  init() {
    this.isInProgress = false;
    this.workerMassCenter.addEventListener('message', this.workerHandeler);
  }

  kill() {
    this.workerMassCenter.removeEventListener('message', this.workerHandeler);
    this.workerMassCenter.terminate();
  }

  calc(data, test) {
    if (this.isInProgress) return;
    this.isInProgress = true;
    this.workerMassCenter.postMessage({
      dataArr: data,
      test,
    });
  }
}
