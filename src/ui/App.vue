<template>
  <div ref="app" class="app">
    <div class="app__title">Galaxy simulation</div>
    <Menu :selectedMenuIdx="selectedMenuIdx" @onSelectMenu="onSelectMenu" />
    <div class="app__wraper">
      <Navigation v-if="selectedMenuIdx == MenuStateConst.navigation" />
      <div
        v-if="selectedMenuIdx == MenuStateConst.addStar"
        class="app_add-point"
      >
        Mouse click point
      </div>
      <SaveFileForm v-if="selectedMenuIdx == MenuStateConst.saveFile" />
      <LoadFileForm v-if="selectedMenuIdx == MenuStateConst.loadFile" />
      <StarTracking v-if="selectedMenuIdx == MenuStateConst.starTracking" />
      <Player v-if="selectedMenuIdx == MenuStateConst.player" />
    </div>
    <StatusBar />
  </div>
</template>

<script>
import LoadFileForm from '@/ui/saveLoadFile/LoadFileForm.vue';
import SaveFileForm from '@/ui/saveLoadFile/SaveFileForm.vue';
import Navigation from '@/ui/navigation/Navigation.vue';
import StarTracking from '@/ui/tracking/TrackingTab.vue';
import Player from '@/ui/player/Player.vue';
import menuState, { MenuStateConst } from '@/module/menuState';

import Menu from '@/ui/menu/Menu.vue';
import StatusBar from '@/ui/StatusBar.vue';

export default {
  name: 'App',

  components: {
    SaveFileForm,
    LoadFileForm,
    Navigation,
    Menu,
    StatusBar,
    StarTracking,
    Player,
  },

  data() {
    return {
      selectedMenuIdx: 0,
    };
  },

  computed: {
    MenuStateConst() {
      return MenuStateConst;
    },
  },

  watch: {},

  mounted() {},

  methods: {
    onSelectMenu(idx) {
      menuState.state = idx;
      this.selectedMenuIdx = idx;
    },
  },
};
</script>

<style lang="scss">
.app {
  border: 1px solid #ffffff;
  position: absolute;
  width: 400px;
  top: 20px;
  right: 20px;
  color: #ffffff;

  &__wraper {
    padding: 10px 20px;
  }

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ffffff;
    padding: 5px;
    margin-top: -1px;
    margin-bottom: 10px;
    font-size: 20px;
  }
}
</style>
