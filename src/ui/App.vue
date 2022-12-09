<template>
  <div ref="app" class="app">
    <div class="app__title">Galaxy simulation</div>
    <Menu :selectedMenuIdx="selectedMenuIdx" @onSelectMenu="onSelectMenu" />
    <Navigation v-if="selectedMenuIdx == 0" />
    <div v-if="selectedMenuIdx == 1" class="app_add-point">Mouse click point</div>
    <SaveFileForm v-if="selectedMenuIdx == 2" />
    <LoadFileForm v-if="selectedMenuIdx == 3" />
  </div>
</template>

<script>
import LoadFileForm from '@/ui/saveLoadFile/LoadFileForm.vue';
import SaveFileForm from '@/ui/saveLoadFile/SaveFileForm.vue';
import Navigation from '@/ui/navigation/Navigation.vue';

import Menu from '@/ui/menu/Menu.vue';

export default {
  name: 'App',

  components: {
    SaveFileForm,
    LoadFileForm,
    Navigation,
    Menu,
  },

  data() {
    return {
      selectedMenuIdx: 0,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onSelectMenu(idx) {
      window.menuState = idx;
      this.selectedMenuIdx = idx;
    },
  },
};
</script>

<style lang="scss">
.app {
  border: 1px solid #ffffff;
  position: absolute;
  padding: 0px 40px 40px 40px;
  width: 400px;
  top: 20px;
  right: 20px;
  color: #ffffff;

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ffffff;
    padding: 5px;
    margin-top: -1px;
    margin-bottom: 10px;
    font-size: 20px;
  }
}
</style>
