import {Vector} from "../vector";

export class Draw {
  public ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D | null) {
    this.ctx = new CanvasRenderingContext2D();
    if(ctx) {
      this.ctx = ctx;
    }
  }

  clear() {
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  rect(point: Vector, size: Vector, color: string) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(point.x, point.y, size.x, size.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  line(p1: Vector, p2: Vector, color: string) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  getVH(): Vector {
    return new Vector(this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

