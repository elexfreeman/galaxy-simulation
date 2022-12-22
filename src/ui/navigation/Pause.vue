<template>
  <div class="pause">
    <TButton class="pause__button" v-if="isPause" @click="onPause"
      >⏵ Resume
    </TButton>
    <TButton class="pause__button" v-if="!isPause" @click="onPause"
      >⏸ Pause
    </TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import stars from '@/global/stars';

export default {
  components: {
    TButton,
  },

  data() {
    return {
      isPause: stars.isPause,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    setPause() {
      setTimeout(() => {
        if (this.isPause) {
          this.isPause = stars.isPause;
          this.setPause();
        }
      }, 500);
    },
    onPause() {
      stars.isPause = !stars.isPause;
      this.isPause = stars.isPause;
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
