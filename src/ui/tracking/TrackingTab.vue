<template>
  <div class="tracking-tab">
    <div class="tracking-tab__title">Star Group Tracking</div>
    <TButton v-if="!isStartSelect" @click="onStartSelect">Click to select a group</TButton>
    <TButton v-if="isStartSelect" @click="onAbortSelect">Abort select a group</TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';

export default {
  components: {
    TButton,
    TInput,
  },

  data() {
    return {
      isOnSave: false,
      isStartSelect: false,
      isStartRect: false,
    };
  },

  computed: {},

  watch: {},

  mounted() {
    window.canvasElem.elem.addEventListener('mousedown', this.onMouseDown);
    window.canvasElem.elem.addEventListener('mouseup', this.onMouseUp);
    window.canvasElem.elem.addEventListener('mousemove', this.onMouseMove);
  },

  destroyed() {
    window.canvasElem.elem.removeEventListener('mousedown', this.onMouseDown);
    window.canvasElem.elem.removeEventListener('mouseup', this.onMouseUp);
    window.canvasElem.elem.removeEventListener('mousemove', this.onMouseMove);
  },

  methods: {
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
    onMouseUp() {
      this.isStartRect = false;
      window.mouseRect = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      };
    },
    onMouseMove(event) {
      if (!this.isStartRect) return;
      window.mouseRect.x2 = event.x;
      window.mouseRect.y2 = event.y;
    },
  },
};
</script>

<style lang="scss">
.tracking-tab {
  &__title {
    margin-bottom: 10px;
  }
}
</style>
