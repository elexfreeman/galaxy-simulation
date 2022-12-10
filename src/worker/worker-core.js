export class WorkerCore {
  constructor() {
    window.workerMassCenter = new Worker(
      new URL('./workerMassCenter.js', import.meta.url),
      {type: 'module'}
    );
    this.startWorker = new Date();
  }

  init() {
    let that = this;
    this.isInProgress = false;
    window.workerMassCenter.onmessage = (e) => {
      window.centerMassVector = e.data.centerMassVectorXY
      window.centerMassVectorV = e.data.centerMassVectorV;
      window.maxField = e.data.maxField;
      that.isInProgress = false;
      that.startWorker = new Date();
    };
  }

  calc() {
    if (this.isInProgress) return;

    this.isInProgress = true;
    let timeWorker = Math.ceil(100 * 1000 / (new Date() - this.startWorker)) / 100;
    window.workerFps = timeWorker;
    window.workerMassCenter.postMessage({
      dataArr: window.dataArrWithField,
      width: window.innerWidth,
      height: window.innerHeight,
      count: window.MAX_DOTS,
    });
  }

}
