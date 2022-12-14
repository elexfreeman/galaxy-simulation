<template>
  <div class="tracking-tab">
    <div class="tracking-tab__title">Star Group Tracking</div>
    <TButton class="tracking-tab__btn" v-if="!isStartSelect" @click="onStartSelect">Click to select a group</TButton>
    <TButton class="tracking-tab__btn" v-if="isStartSelect" @click="onAbortSelect">Abort select a group</TButton>
    <canvas width="360" height="360" ref="canvas" class="tracking-tab__canvas" />
    <TrackingStatusBar :centerMassVector="centerMassVector" />
  </div>
</template>

<script>
import { getStartsFromRect } from '@/module/starTracker';
import { Vector } from '@/vector';
import { xyToCanvas } from '@/utils/utils';
import { getDotColorFromField } from '@/utils/gradient';

import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';
import TrackingStatusBar from '@/ui/tracking/StatusBar.vue'

export default {
  components: {
    TButton,
    TInput,
    TrackingStatusBar,
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
      centerMassVector: new Vector(0, 0),
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
      this.starList = getStartsFromRect();
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
    drawStars(starList, that) {
      if (!that.$refs?.canvas?.offsetHeight) return;

      const zoom = 2.9;
      let x = 0;
      let y = 0;
      let dx,
        dy = 0;
      let field = 0;

      const { offsetWidth, offsetHeight } = that.$refs['canvas'];

      const centerMassVector = new Vector(0, 0);
      const count = starList.length;
      let maxField = 0;

      for (let k = 0; k < starList.length; k++) {
        centerMassVector.x += starList[k][0];
        centerMassVector.y += starList[k][1];
        if (starList[k][2] > maxField) {
          maxField = dataArr[k][2];
        }
      }

      centerMassVector.x = centerMassVector.x / count;
      centerMassVector.y = centerMassVector.y / count;

      that.centerMassVector = centerMassVector;

      for (let k = 0; k < window.dataArrWithField.length; k++) {
        let { dx, dy } = xyToCanvas(
          window.dataArrWithField[k][0],
          window.dataArrWithField[k][1],
          zoom,
          centerMassVector,
          offsetWidth,
          offsetHeight,
        );
        field = window.dataArrWithField[k][2];

        that.ctx.beginPath();
        that.ctx.fillStyle = that.getDotColorFromField(field);
        that.ctx.fillRect(dx, dy, 3, 3);
        that.ctx.closePath();
        that.ctx.stroke();
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
    },
    draw(that) {
      if (!that) return;

      that.clearCanvas(that);

      const starList = that.starList.map((item) => {
        return dataArr[item];
      });

      that.drawStars(starList, that);
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
