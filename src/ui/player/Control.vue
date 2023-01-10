<template>
  <div class="player-control">
    <TButton @click="onTurnLeft" class="player-control__button">L</TButton>
    <TButton @click="onPower" class="player-control__button">D</TButton>
    <TButton @click="onTurnRight" class="player-control__button">R</TButton>
  </div>
</template>

<script>
import { degToRad } from '@/utils/common';
import { player } from '@/global/player';

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
    onTurnLeft() {
      player.rotate(degToRad(-10));
    },
    onTurnRight() {
      player.rotate(degToRad(10));
    },
    onPower() {
      player.power();
    },
  },
};
</script>

<style lang="scss">
.player-control {
  display: flex;
  justify-content: center;

  &__button {
    width: 100px;
  }
}
</style>
