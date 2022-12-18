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
import { getStarFromRect, drawTraking, drawTrakingNet } from '@/module/starTracker';
import { Vector } from '@/vector';
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
      starIdx: -1,
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
      this.starIdx = getStarFromRect();
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
    drawStars(starIdx, that) {
      if (!that.$refs?.canvas?.offsetHeight) return;
      if (starIdx < 0) return;

      const { offsetWidth, offsetHeight } = that.$refs['canvas'];
      const zoom = that.zoom;
      drawTraking(offsetWidth, offsetHeight, zoom, starIdx, that.ctx, that.$refs?.roketImg, 'green');
      drawTrakingNet(offsetWidth, offsetHeight, starIdx, that.ctx, 20);
    },
    draw(that) {
      if (!that) return;
      if (that.starIdx < 0) return;
      that.clearCanvas(that);
      that.centerMassVector = new Vector(window.dataArr[that.starIdx][0], window.dataArr[that.starIdx][1]);
      that.drawStars(that.starIdx, that);
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
