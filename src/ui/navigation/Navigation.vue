<template>
  <div class="navigation">
    <Zoom @onZoom="onZoom" />
    <Pause />
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import Zoom from '@/ui/components/Zoom.vue';
import Pause from '@/ui/navigation/Pause.vue';

import stars from '@/global/stars';

export default {
  components: {
    TButton,
    Zoom,
    Pause,
  },

  data() {
    return {
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onZoom(zoom) {
      stars.zoom = zoom;
    }
  },
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;
}
</style>
