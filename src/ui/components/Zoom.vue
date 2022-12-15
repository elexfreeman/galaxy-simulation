<template>
  <div class="zoom">
    <div class="zoom__title">Zoom:</div>
    <div class="zoom__wraper">
      <TButton @click="onMinusZoom" class="zoom__button">-</TButton>
      <div class="zoom__data">
        {{ roudedZoom }}
      </div>
      <TButton @click="onPlusZoom" class="zoom__button">+</TButton>
    </div>
  </div>
</template>

<script>
import { ZOOM_FACTOR, ZOOM_FACTOR_MIN } from '@/consts';
import TButton from '@/ui/components/Button.vue';

export default {
  components: {
    TButton,
  },

  data() {
    return {
      zoom: 1,
    };
  },

  computed: {
    roudedZoom() {
      return Math.ceil(this.zoom * 1000) / 1000;
    },
    zoomFactor() {
      if (this.zoom < 0.1) {
        return ZOOM_FACTOR_MIN * 0.1;
      }
      if (this.zoom < 1) {
        return ZOOM_FACTOR_MIN;
      }
      return ZOOM_FACTOR;
    },
  },

  watch: {},

  mounted() {},

  methods: {
    onMinusZoom() {
      this.zoom = this.zoom - this.zoomFactor;
      if (this.zoom <= 0) this.zoom = 0.25;
      this.$emit('onZoom', this.zoom);
    },
    onPlusZoom() {
      this.zoom = this.zoom + this.zoomFactor;
      this.$emit('onZoom', this.zoom);
    },
  },
};
</script>

<style lang="scss">
.zoom {
  display: flex;
  width: 170px;
  justify-content: space-between;
  align-items: center;

  &__wraper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &__button {
    width: 30px;
  }

  &__data {
    width: 40px;
    text-align: center;
  }
}
</style>
