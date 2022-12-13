<template>
  <div class="menu">
    <TButton
    v-for="(item, key) in menuData" :key="key"
    @click="onSelectMenu(key)"
    :isSelected="isMenuSelected(key)"
    >
    {{ item.title }}
    </TButton>
  </div>
</template>

<script>
import { menuData } from '@/ui/menu/menuData';
import TButton from '@/ui/components/Button.vue';

export default {
  components: {
    TButton,
  },

  data() {
    return {};
  },

  props: {
    selectedMenuIdx: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    menuData() {
      return menuData;
    },
  },

  watch: {},

  mounted() {},

  methods: {
    onSelectMenu(idx) {
      this.$emit('onSelectMenu', idx);
    },
    isMenuSelected(key) {
      return this.selectedMenuIdx === key;
    }
  },
};
</script>

<style lang="scss">
.menu {
  display: flex;
  gap: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
}
</style>
