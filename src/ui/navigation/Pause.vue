<template>
  <div class="pause">
    <TButton class="pause__button" v-if="isPause" @click="onPause">⏵ Resume </TButton>
    <TButton class="pause__button" v-if="!isPause" @click="onPause">⏸ Pause </TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';

export default {
  components: {
    TButton,
  },

  data() {
    return {
      isPause: window.isPause,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    setPause() {
      setTimeout(() => {
        if (this.isPause) {
          this.isPause = window.isPause;
          this.setPause();
        }
      }, 500);
    },
    onPause() {
      window.isPause = !window.isPause;
      this.isPause = window.isPause;
    },
  },
};
</script>

<style lang="scss">
.pause {
  &__button {
    width: 100px;
  }
}
</style>
