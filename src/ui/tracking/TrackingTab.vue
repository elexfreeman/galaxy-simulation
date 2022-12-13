<template>
  <div class="tracking-tab">
    <div class="tracking-tab__title">Star Group Tracking</div>
    <TButton v-if="!isStartSelect" @click="onStartSelect">Click to select a group</TButton>
    <TButton v-if="isStartSelect" @click="onAbortSelect">Abort select a group</TButton>
  </div>
</template>

<script>
import TButton from '@/ui/components/Button.vue';
import TInput from '@/ui/components/Input.vue';

export default {
  components: {
    TButton,
    TInput,
  },

  data() {
    return {
      isOnSave: false,
      isStartSelect: false,
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {
    onStartSelect() {
      window.isPause = true;
      this.isStartSelect = true;
    },
    onAbortSelect() {
      window.isPause = false;
      this.isStartSelect = false;
    }
  },
};
</script>

<style lang="scss">
.tracking-tab {
  &__title {
    margin-bottom: 10px;
  }
}
</style>
