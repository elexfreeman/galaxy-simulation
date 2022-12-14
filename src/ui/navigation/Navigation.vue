<template>
  <div class="navigation">
    <Zoom />
    <Pause />
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import Zoom from '@/ui/navigation/Zoom.vue';
import Pause from '@/ui/navigation/Pause.vue';

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

  methods: {},
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;
}
</style>
