import { GPU } from 'gpu.js';
import { kernelXY, kernelForceField } from '@/core/gpu-core';

export class Core {
  constructor() {
    const kk = this.getKernel();
    this.kernel = kk.kernel;
    this.kernelForce = kk.kernelForce;
  }

  getKernel() {
    const gpu = new GPU();
    const kernel = gpu
      .createKernel(kernelXY)
      .setDynamicArguments(true)
      .setDynamicOutput(true);
    const kernelForce = gpu
      .createKernel(kernelForceField)
      .setDynamicArguments(true)
      .setDynamicOutput(true);

    return {
      kernel,
      kernelForce,
    };
  }

  refresh() {
    const kk = this.getKernel();
    this.kernel = kk.kernel;
    this.kernelForce = kk.kernelForce;
  }
}
