<template>
  <div class="menu">
    <TButton :isSelected="isMenuSelected(0)">Add point</TButton>
    <TButton :isSelected="isMenuSelected(1)">Save to file</TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';

export default {
  components: {
    TButton,
  },

  data() {
    return {};
  },

  props: {
    menuIdx: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onSelectMenuItem(idx) {
      this.$emit('onSelectMenuItem', idx);
    },
    isMenuSelected(menuIdx) {
      return this.menuIdx = menuIdx;
    }
  },
};
</script>

<style lang="scss">
.menu {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
}
</style>
