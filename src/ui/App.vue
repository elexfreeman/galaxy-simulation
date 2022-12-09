<template>
  <div ref="app" class="app">
    <div class="app__title">Galaxy simulation</div>
    <Menu
      :selectedMenuIdx="selectedMenuIdx"
      @onSelectMenu="onSelectMenu"
      />
    <SaveFileForm />
  </div>
</template>

<script>
import SaveFileForm from '@/ui/saveLoadFile/SaveFileForm.vue';
import Menu from '@/ui/menu/Menu.vue';

export default {
  name: 'App',

  components: {
    SaveFileForm,
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
      this.selectedMenuIdx = idx;
    }
  },
};
</script>

<style lang="scss">
.app {
  border: 1px solid #FFFFFF;
  position: absolute;
  padding: 0px 40px 40px 40px;
  width: 400px;
  top: 20px;
  right: 20px;
  color: #FFFFFF;

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    padding: 5px;
    margin-top: -1px;
    margin-bottom: 10px;
    font-size: 20px;
  }
}
</style>
