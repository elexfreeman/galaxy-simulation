export class WorkerCore {
  constructor(callback, that) {
    this.callback = callback;
    if (that) {
      window.that11 = that;
      this.callback = callback.bind(that);
    }
    console.log(this.that)
    this.workerMassCenter = new Worker(
      new URL('./workerMassCenter.js', import.meta.url),
      {type: 'module'}
    );
    this.workerHandeler = this.workerHandeler.bind(this);
    this.calc = this.calc.bind(this);
  }

  workerHandeler(e) {
    if (window.that11) {
      window.that11.workerCallback({
        centerMassVector: e.data.centerMassVectorXY,
        centerMassVectorV: e.data.centerMassVectorV,
        maxField: e.data.maxField,
      }, window.that11);
    } else
      this.callback({
        centerMassVector: e.data.centerMassVectorXY,
        centerMassVectorV: e.data.centerMassVectorV,
        maxField: e.data.maxField,
      }, window.that11);
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
