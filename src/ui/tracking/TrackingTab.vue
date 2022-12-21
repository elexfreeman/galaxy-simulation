<template>
  <div class="tracking-tab">
    <div class="tracking-tab__title">Star Group Tracking</div>
    <TButton
      class="tracking-tab__btn"
      v-if="!isStartSelect"
      @click="onStartSelect"
      >Click to select a group</TButton
    >
    <TButton
      class="tracking-tab__btn"
      v-if="isStartSelect"
      @click="onAbortSelect"
      >Abort select a group</TButton
    >
    <canvas
      width="360"
      height="360"
      ref="canvas"
      class="tracking-tab__canvas"
    />
    <TrackingStatusBar :centerMassVector="centerMassVector" />
    <Zoom @onZoom="onZoom" />
    <div style="display: none">
      <img
        ref="roketImg"
        src="../../images/roket1.png"
        width="15"
        height="25"
      />
    </div>
  </div>
</template>

<script>
import {
  getStarFromRect,
  drawTraking,
  drawTrakingNet,
  mouseRect,
} from '@/module/starTracker';
import { Vector } from '@/vector';
import { getDotColorFromField } from '@/utils/gradient';
import { draw, ctx, elem, mouseCoord } from '@/global/draw';

import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';
import Zoom from '@/ui/components/Zoom.vue';
import TrackingStatusBar from '@/ui/tracking/StatusBar.vue';
import stars from '@/global/stars';
import { Draw } from '@/utils/draw';

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
      drawClass: null,
      starList: [],
      starIdx: -1,
      centerMassVector: new Vector(0, 0),
      zoom: 1,
    };
  },

  computed: {},

  watch: {},

  mounted() {
    elem.addEventListener('mousedown', this.onMouseDown);
    elem.addEventListener('mouseup', this.onMouseUp);
    elem.addEventListener('mousemove', this.onMouseMove);
    const ctx = this.$refs['canvas'].getContext('2d');
    this.drawClass = new Draw(ctx);
    //    this.worker = new WorkerCore(this.workerCallback, this);
  },

  destroyed() {
    elem.removeEventListener('mousedown', this.onMouseDown);
    elem.removeEventListener('mouseup', this.onMouseUp);
    elem.removeEventListener('mousemove', this.onMouseMove);
  },

  methods: {
    getDotColorFromField,
    workerCallback(data, that) {
      that.centerMassVector = data.centerMassVector;
    },
    onStartSelect() {
      stars.isPause = true;
      this.isStartSelect = true;
    },
    onAbortSelect() {
      stars.isPause = false;
      this.isStartSelect = false;
    },
    onZoom(zoom) {
      this.zoom = zoom;
    },
    onMouseDown(event) {
      if (!this.isStartSelect) return;
      this.isStartRect = true;
      mouseRect.point1.x = event.x;
      mouseRect.point1.y = event.y;
    },
    onMouseMove(event) {
      if (!this.isStartRect) return;
      mouseRect.point2.x = event.x;
      mouseRect.point2.y = event.y;
    },
    onMouseUp() {
      this.isStartRect = false;
      this.starIdx = getStarFromRect();
      this.isStartDraw = true;
      this.isStartSelect = false;
      stars.isPause = false;
      mouseRect.point2.x = event.x;
      mouseRect.point1 = new Vector(0, 0);
      mouseRect.point2 = new Vector(0, 0);
      this.draw(this);
    },
    drawStars(starIdx, that) {
      if (!that.$refs?.canvas?.offsetHeight) return;
      if (starIdx < 0) return;

      const vh = that.drawClass.getVH();
      const zoom = that.zoom;
      drawTraking(
        vh,
        zoom,
        starIdx,
        that.drawClass,
        that.$refs?.roketImg,
        'green',
      );
      //      drawTrakingNet(vh, starIdx, that.ctx, 20);
    },
    draw(that) {
      if (!that) return;
      if (that.starIdx < 0) return;
      that.drawClass.clear();
      that.centerMassVector = stars.getStarXY(0);
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
