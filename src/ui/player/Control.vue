<template>
  <div class="pause">
    <TButton class="pause__button" v-if="isPause" @click="onLeft">
      Left
    </TButton>
    <TButton class="pause__button" v-if="!isPause" @click="onDrive">
      Drive
    </TButton>
    <TButton class="pause__button" v-if="!isPause" @click="onRight">
      Right
    </TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import stars from '@/global/stars';
import { player } from '@/global/player';

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
