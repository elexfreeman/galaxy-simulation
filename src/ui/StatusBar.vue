<template>
  <div class="status-bar">
    <div class="status-bar__item status-bar__item-fps">fps: {{ fps }}</div>
    <div class="status-bar__item">Dots count: {{ dotsCount }}</div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      fps: window.fps,
      dotsCount: window.dataArr.length,
      workerFps: window.workerFps,
    };
  },

  props: {},
  computed: {},

  watch: {},

  mounted() {
    this.fpsWatcher();
    this.dotsCountWatcher();
    this.workerFpsWatcher();
  },

  methods: {
    fpsWatcher() {
      this.fps = window.fps;
      setTimeout(() => {
        if (this.fpsWatcher) {
          this.fpsWatcher();
        }
      }, 500);
    },
    dotsCountWatcher() {
      this.dotsCount = window.dataArr.length;
      setTimeout(() => {
        if (this.dotsCountWatcher) {
          this.dotsCountWatcher();
        }
      }, 500);
    },
    workerFpsWatcher() {
      this.workerFps = window.workerFps;
      setTimeout(() => {
        if (this.workerFpsWatcher) {
          this.workerFpsWatcher();
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.status-bar {
  display: flex;
  gap: 5px;
  border-top: 1px solid #ffffff;

  &__item {
    border-right: 1px solid #ffffff;
    padding: 5px;
  }

  &__item-fps {
    width: 72px;
  }
}
</style>
