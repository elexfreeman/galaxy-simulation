<template>
  <div class="tracking-tab">
    <div class="tracking-tab__title">Star Group Tracking</div>
    <TButton class="tracking-tab__btn" v-if="!isStartSelect" @click="onStartSelect">Click to select a group</TButton>
    <TButton class="tracking-tab__btn" v-if="isStartSelect" @click="onAbortSelect">Abort select a group</TButton>
    <canvas width="360" height="360" ref="canvas" class="tracking-tab__canvas" />
    <TrackingStatusBar :centerMassVector="centerMassVector" />
    <Zoom @onZoom="onZoom" />
    <div style="display: none">
      <img ref="roketImg" src="../../images/roket1.png" width="15" height="25" />
    </div>
  </div>
</template>

<script>
import { getStarFromRect } from '@/module/starTracker';
import { Vector } from '@/vector';
import { xyToCanvas, radToDeg } from '@/utils/utils';
import { getDotColorFromField } from '@/utils/gradient';

import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';
import Zoom from '@/ui/components/Zoom.vue';
import TrackingStatusBar from '@/ui/tracking/StatusBar.vue';

export default {
  components: {
    TButton,
    TInput,
    TrackingStatusBar,
    Zoom,
  },

  data() {
    return {
      isOnSave: false,
      isStartSelect: false,
      isStartRect: false,
      isStartDraw: false,
      worker: null,
      ctx: null,
      starList: [],
      star: null,
      centerMassVector: new Vector(0, 0),
      zoom: 1,
    };
  },

  computed: {},

  watch: {},

  mounted() {
    window.canvasElem.elem.addEventListener('mousedown', this.onMouseDown);
    window.canvasElem.elem.addEventListener('mouseup', this.onMouseUp);
    window.canvasElem.elem.addEventListener('mousemove', this.onMouseMove);
    this.ctx = this.$refs['canvas'].getContext('2d');

    //    this.worker = new WorkerCore(this.workerCallback, this);
  },

  destroyed() {
    window.canvasElem.elem.removeEventListener('mousedown', this.onMouseDown);
    window.canvasElem.elem.removeEventListener('mouseup', this.onMouseUp);
    window.canvasElem.elem.removeEventListener('mousemove', this.onMouseMove);
  },

  methods: {
    getDotColorFromField,
    workerCallback(data, that) {
      that.centerMassVector = data.centerMassVector;
    },
    onStartSelect() {
      window.isPause = true;
      this.isStartSelect = true;
    },
    onAbortSelect() {
      window.isPause = false;
      this.isStartSelect = false;
    },
    onZoom(zoom) {
      this.zoom = zoom;
    },
    onMouseDown(event) {
      if (!this.isStartSelect) return;
      this.isStartRect = true;
      window.mouseRect.x1 = event.x;
      window.mouseRect.y1 = event.y;
    },
    onMouseMove(event) {
      if (!this.isStartRect) return;
      window.mouseRect.x2 = event.x;
      window.mouseRect.y2 = event.y;
    },
    onMouseUp() {
      this.isStartRect = false;
      this.star = getStarFromRect();
      this.isStartDraw = true;
      this.isStartSelect = false;
      window.isPause = false;
      window.mouseRect = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      };
      this.draw(this);
    },
    clearCanvas(that) {
      if (!that.$refs?.canvas?.offsetHeight) return;
      const { offsetWidth, offsetHeight } = that.$refs['canvas'];
      that.ctx.globalCompositeOperation = 'destination-over';
      that.ctx.clearRect(0, 0, offsetWidth, offsetHeight); // clear canvas
    },
    drawStars(star, that) {
      if (!that.$refs?.canvas?.offsetHeight) return;
      if (!star) return;

      const zoom = that.zoom;
      let field = 0;

      const { offsetWidth, offsetHeight } = that.$refs['canvas'];

      const centerMassVector = new Vector(0, 0);
      centerMassVector.x = window.dataArr[star][0];
      centerMassVector.y = window.dataArr[star][1];

      that.centerMassVector = centerMassVector;

      let vecV = new Vector(0, 0);
      let vecXY = new Vector(0, 0);
      vecV.x = window.dataArr[star][2];
      vecV.y = window.dataArr[star][3];

      const osX = new Vector(1, 0);
      const deg = Vector.angle2V(osX, vecV);

      const offsetButtom = offsetHeight / 5;

      for (let k = 0; k < window.dataArrWithField.length; k++) {
        vecXY.x = window.dataArr[k][0];
        vecXY.y = window.dataArr[k][1];

        vecXY = Vector.rotateVector(vecXY, centerMassVector, deg - 3.14 / 2);
        vecXY = Vector.minus(vecXY, centerMassVector);
        vecXY = Vector.multDigit(vecXY, zoom);
        const offset = new Vector(offsetWidth / 2, offsetHeight / 2);
        vecXY = Vector.add(vecXY, offset);

        field = window.dataArrWithField[k][2];

        vecXY = Vector.add(vecXY, new Vector(0, offsetButtom));

        that.ctx.beginPath();
        that.ctx.fillStyle = that.getDotColorFromField(field);
        that.ctx.fillRect(vecXY.x, vecXY.y, 3, 3);
        that.ctx.closePath();
        that.ctx.stroke();
      }

      const ship = new Vector(offsetWidth / 2, offsetHeight - offsetButtom - 40);
      const roketImg = that.$refs['roketImg'];
      if (roketImg) {
        that.ctx.drawImage(roketImg, ship.x - 6, ship.y, 15, 25);
      }

      const rectXY = xyToCanvas(
        centerMassVector.x - 10,
        centerMassVector.y - 10,
        window.zoom,
        window.centerMassVector,
        window.innerWidth,
        window.innerHeight,
      );

      window.canvasElem.ctx.beginPath();
      window.canvasElem.ctx.strokeStyle = 'green';
      window.canvasElem.ctx.strokeRect(rectXY.dx, rectXY.dy, 20, 20);
      window.canvasElem.ctx.closePath();
      window.canvasElem.ctx.stroke();

      vecV = Vector.multDigit(vecV, 100);

      window.canvasElem.ctx.beginPath();
      window.canvasElem.ctx.strokeStyle = 'green';
      window.canvasElem.ctx.fillStyle = 'green';
      window.canvasElem.ctx.lineTo(rectXY.dx + 10, rectXY.dy + 10);
      window.canvasElem.ctx.lineTo(rectXY.dx + vecV.x, rectXY.dy + vecV.y);
      window.canvasElem.ctx.closePath();
      window.canvasElem.ctx.stroke();
    },
    draw(that) {
      if (!that) return;

      that.clearCanvas(that);

      that.drawStars(that.star, that);
      requestAnimationFrame(() => {
        this.draw(that);
      });
    },
  },
};
</script>

<style lang="scss">
.tracking-tab {
  &__title {
    margin-bottom: 10px;
  }

  &__canvas {
    background: #1f1f1f;
    border: 1px solid #191919;
  }

  &__btn {
    margin-bottom: 10px;
  }
}
</style>
