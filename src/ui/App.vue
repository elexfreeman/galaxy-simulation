<template>
  <div id='aaa' ref="app" class="app"></div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';

export default {
  name: 'App',

  components: {
    TButton,
    TInput,
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  mounted() { },

  methods: { },
};
</script>

<style lang="scss">
.app {
  border: 1px solid #ddd;
  position: absolute;
  padding: 40px;
  width: 400px;
  top: 20px;
  right: 20px;
  backdrop-filter: blur(2px);
}
</style>
