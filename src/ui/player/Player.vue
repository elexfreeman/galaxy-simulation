<template>
  <div class="player-tab">
    <div class="player-tab__title">Player Tracking</div>
    <Zoom class="player-tab__zoom" @onZoom="onZoom" />
    <canvas
      width="360"
      height="360"
      ref="canvas"
      class="tracking-tab__canvas"
    />
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
import { drawTraking, drawPlayerRot } from '@/module/starTracker';
import { getDotColorFromField } from '@/utils/gradient';
import { player } from '@/global/player';
import stars from '@/global/stars';
import { Draw } from '@/utils/draw';

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
    };
  },

  computed: {},

  watch: {},

  mounted() {
    const ctx = this.$refs['canvas'].getContext('2d');
    this.drawClass = new Draw(ctx);
    this.draw(this);
  },

  destroyed() {},

  methods: {
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
      drawTraking(
        vh,
        zoom,
        starIdx,
        that.drawClass,
        that.$refs?.roketImg,
        'green',
      );

      drawPlayerRot(vh, that.drawClass, 'green', player.getRot());
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
    background: #1f1f1f;
    border: 1px solid #191919;
  }

  &__btn {
    margin-bottom: 10px;
  }
}
</style>
