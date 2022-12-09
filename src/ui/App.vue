<template>
  <div ref="app" class="app">
    <SaveFileForm />
  </div>
</template>

<script>
import SaveFileForm from '@/ui/saveLoadFile/SaveFileForm.vue';

export default {
  name: 'App',

  components: {
    SaveFileForm,
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {},
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
}
</style>
