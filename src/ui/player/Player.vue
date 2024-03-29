<template>
  <div class="player-tab">
    <div class="player-tab__title">Player Tracking</div>
    <Zoom class="player-tab__zoom" @onZoom="onZoom" />
    <canvas width="360" height="360" ref="canvas" class="player-tab__canvas" />
    <TrackingStatusBar :centerMassVector="centerMassVector" />
    <div style="display: none">
      <img
        ref="roketImg"
        src="../../images/roket1.png"
        width="15"
        height="25"
      />
    </div>
    <Playercontrol />
  </div>
</template>

<script>
import { Vector } from '@/utils/vector';

import { getDotColorFromField } from '@/utils/gradient';
import { xyToCanvas } from '@/utils/common';
import { Draw } from '@/utils/draw';

import { player } from '@/global/player';
import stars from '@/global/stars';
import { elem, mouseCoord } from '@/global/draw';
import { draw } from '@/global/draw';

import {
  PLAYER_SPEED_MULTIPLY,
  drawPlayerTraking,
  drawPlayerRot,
  drawPlayerPower,
  drawPlayerV,
  drawPlayerRect,
  drawShip,
} from '@/module/player';

import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';
import Zoom from '@/ui/components/Zoom.vue';
import TrackingStatusBar from '@/ui/tracking/StatusBar.vue';
import Playercontrol from '@/ui/player/Control.vue';

export default {
  components: {
    TButton,
    TInput,
    TrackingStatusBar,
    Zoom,
    Playercontrol,
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
      centerMassVector: player.getCoord(),
      zoom: 1,
      isMouseDown: false,
      playerCoord: new Vector(0, 0),
    };
  },

  computed: {},

  watch: {},

  mounted() {
    const ctx = this.$refs['canvas'].getContext('2d');
    this.drawClass = new Draw(ctx);
    this.draw(this);
    elem.addEventListener('mouseup', this.onMouseUp);
    elem.addEventListener('mousedown', this.onMouseDown);
    elem.addEventListener('mousemove', this.onMouseMove);
  },

  destroyed() {
    elem.removeEventListener('mousedown', this.onMouseDown);
    elem.removeEventListener('mouseup', this.onMouseUp);
    elem.removeEventListener('mousemove', this.onMouseMove);
  },

  methods: {
    setPlayerRot() {
      const mouseXYCoord = mouseCoord;
      this.playerCoord = xyToCanvas(
        player.getCoord(),
        stars.zoom,
        stars.centerMassVector,
        draw.getVH(),
      );
      const oX = new Vector(1, 0);
      const alfa = Vector.angle2V(
        oX,
        Vector.minus(this.playerCoord, mouseXYCoord),
      );
      const rot = Vector.multDigit(
        Vector.mult(
          Vector.rotateVector(oX, new Vector(0, 0), alfa),
          new Vector(-1, 1),
        ),
        PLAYER_SPEED_MULTIPLY,
      );
      player.setRot(rot);
    },
    onMouseUp() {
      this.isMouseDown = false;
      player.powerOff();
    },
    onMouseDown() {
      this.isMouseDown = true;
      player.powerOn();
      this.setPlayerRot();
    },
    onMouseMove() {
      if (this.isMouseDown) {
        this.setPlayerRot();
      }
    },
    getDotColorFromField,
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
    drawStars(starIdx, that) {
      if (!that.$refs?.canvas?.offsetHeight) return;
      if (starIdx < 0) return;

      const vh = that.drawClass.getVH();
      const zoom = that.zoom;

      this.playerCoord = xyToCanvas(
        player.getCoord(),
        stars.zoom,
        stars.centerMassVector,
        draw.getVH(),
      );

      drawPlayerTraking(vh, zoom, starIdx, that.drawClass);
      drawPlayerV(that.playerCoord, player.getVelocity(), draw, 'green');
      drawPlayerRect(that.playerCoord, draw, 'green');
      drawPlayerRot(vh, that.drawClass, 'green', player.getRot());
      drawShip(vh, that.drawClass, that.$refs.roketImg);

      if (that.isMouseDown) {
        drawPlayerPower(that.playerCoord, mouseCoord, draw, '#e1e376');
      }
    },
    draw(that) {
      if (!that) return;
      that.drawClass.clear();
      that.centerMassVector = player.getCoord();
      that.drawStars(player.getIdx(), that);
      requestAnimationFrame(() => {
        this.draw(that);
      });
    },
  },
};
</script>

<style lang="scss">
.player-tab {
  &__title {
    margin-bottom: 10px;
  }

  &__zoom {
    margin-bottom: 10px;
  }

  &__canvas {
    background: rgb(31 31 31 / 67%);
    border: 1px solid #191919;
  }

  &__btn {
    margin-bottom: 10px;
  }
}
</style>
